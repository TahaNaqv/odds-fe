import { useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { RAFFLE } from "@/utils/constants";
import { raffleApi } from "@/services/raffle";
import { RaffleData, UserActivity, PurchaseTicketParams } from "./raffle-types";
import { useAppKitAccount } from "@reown/appkit/react";
import { useWalletClient, usePublicClient } from "wagmi";
import { parseEther } from "viem";
import { LOTTERY_ABI, LOTTERY_CONTRACT_ADDRESS } from "@/contracts/lottery";

export const useTicketPurchase = (
  isConnected: boolean,
  isCorrectNetwork: boolean,
  currentRaffle: RaffleData,
  setCurrentRaffle: (raffle: RaffleData) => void,
  setUserActivity: (activity: UserActivity[]) => void,
  setIsLoading: (loading: boolean) => void
) => {
  const { toast } = useToast();
  const { address } = useAppKitAccount();
  const { data: walletClient, isError: isWalletClientError } =
    useWalletClient();
  const publicClient = usePublicClient();

  const estimateGas = async (
    contractTx: any,
    raffleIds: number[],
    ticketCount: number
  ) => {
    try {
      // Estimate gas using the public client with the contract ABI
      const gasEstimate = await publicClient.estimateContractGas({
        address: LOTTERY_CONTRACT_ADDRESS as `0x${string}`,
        abi: LOTTERY_ABI,
        functionName: "buyTickets",
        args: [raffleIds.map((id) => BigInt(id)), BigInt(ticketCount)],
        account: address as `0x${string}`,
      });

      // Add 20% buffer to the estimate
      return (gasEstimate * BigInt(120)) / BigInt(100);
    } catch (error) {
      console.error("Gas estimation failed:", error);
      // Return a default gas limit if estimation fails
      return BigInt(500000);
    }
  };

  const decodeContractError = (error: any): string => {
    // Check if it's a contract error
    if (error?.data?.data) {
      const errorData = error.data.data;

      // Map of error selectors to human-readable messages
      const errorMessages: { [key: string]: string } = {
        "0xf4d678b8": "Insufficient USDC balance",
        "0x13be252b": "Insufficient USDC allowance",
        "0x3323cee4": "Invalid lottery ID",
        "0x0807a218": "Invalid maximum tickets",
        "0xe7cf0886": "Lottery ID already exists",
        "0xed8627a2": "Lottery is not active",
        "0x1d481ef0": "Lottery has already been drawn",
        "0xabdeffd3": "Must buy at least one ticket",
        "0x52df9fe5": "Lottery is sold out",
        "0x66f3ef9b": "No tickets available",
        "0xbcd2902c": "Lottery has not been drawn yet",
        "0x5cd83192": "Insufficient contract balance",
        "0x2d4ba93a": "Invalid lottery ID",
        "0x646cf558": "Lottery ID exists",
      };

      // Get the error selector (first 4 bytes of the error data)
      const errorSelector = errorData.slice(0, 10);
      return errorMessages[errorSelector] || "Contract error occurred";
    }

    // Handle other types of errors
    if (error.message?.includes("insufficient funds")) {
      return "Insufficient funds for gas";
    }
    if (error.message?.includes("user rejected")) {
      return "Transaction was rejected";
    }
    if (error.message?.includes("timeout")) {
      return "Transaction timed out";
    }

    return error.message || "An unknown error occurred";
  };

  const purchaseTicket = useCallback(
    async ({
      ticketCount,
      token,
      autoEntry,
      referralCode,
    }: PurchaseTicketParams) => {
      if (!isConnected || !address) {
        toast({
          title: "Wallet not connected",
          description: "Please connect your wallet to purchase tickets.",
          variant: "destructive",
        });
        return;
      }

      if (!isCorrectNetwork) {
        toast({
          title: "Wrong network",
          description:
            "Please switch to the correct network to purchase tickets.",
          variant: "destructive",
        });
        return;
      }

      if (isWalletClientError || !walletClient) {
        toast({
          title: "Wallet error",
          description:
            "There was an error initializing your wallet. Please try reconnecting.",
          variant: "destructive",
        });
        return;
      }

      if (ticketCount <= 0) {
        toast({
          title: "Invalid ticket count",
          description: "You must purchase at least one ticket.",
          variant: "destructive",
        });
        return;
      }

      setIsLoading(true);

      try {
        // First, create the transaction record
        const response = await raffleApi.purchaseTicket(
          parseInt(currentRaffle.id),
          {
            ticketCount,
            token,
            walletAddress: address.toLowerCase(),
            autoEntry,
            referralCode,
          }
        );

        console.log("Response:", response);

        const { tickets, userReferralCode, contractTx, raffleIds } = response;

        if (!tickets || tickets.length === 0) {
          throw new Error("No tickets were created");
        }

        // Handle contract transactions if they exist
        if (contractTx) {
          const { approveTx, buyTx } = contractTx;
          try {
            // Send the approval transaction
            const approveTxHash = await walletClient.sendTransaction({
              to: approveTx.to as `0x${string}`,
              data: approveTx.data as `0x${string}`,
              value: parseEther(approveTx.value),
              account: approveTx.from as `0x${string}`,
              chainId: approveTx.chainId,
              kzg: undefined,
              chain: undefined,
            });

            // Wait for approval transaction to be confirmed
            await publicClient.waitForTransactionReceipt({
              hash: approveTxHash,
            });

            // Add a longer delay to ensure blockchain state is updated
            await new Promise((resolve) => setTimeout(resolve, 5000));

            // Estimate gas for the buy transaction after approval is confirmed
            const estimatedGas = await estimateGas(
              contractTx,
              raffleIds,
              ticketCount
            );

            // Send the buy tickets transaction with estimated gas
            const buyTxHash = await walletClient.sendTransaction({
              to: buyTx.to as `0x${string}`,
              data: buyTx.data as `0x${string}`,
              value: BigInt(0),
              account: buyTx.from as `0x${string}`,
              chainId: buyTx.chainId,
              gas: estimatedGas.toString(),
              kzg: undefined,
              chain: undefined,
            });

            console.log("Buy transaction hash:", buyTxHash);

            // Add timeout and better error handling
            const receipt = await Promise.race([
              publicClient.waitForTransactionReceipt({
                hash: buyTxHash,
                timeout: 300000, // 5 minutes timeout
              }),
              new Promise((_, reject) =>
                setTimeout(
                  () => reject(new Error("Transaction timeout")),
                  300000
                )
              ),
            ]);

            if (!receipt) {
              throw new Error("Transaction failed to confirm");
            }

            console.log("Transaction receipt:", receipt);

            // Update current raffle only after transaction is confirmed
            const updatedRaffle: RaffleData = {
              ...currentRaffle,
              ticketsSold: currentRaffle.ticketsSold + ticketCount,
              prizePool:
                currentRaffle.prizePool + ticketCount * RAFFLE.ticketPrice,
              progress:
                ((currentRaffle.ticketsSold + ticketCount) /
                  currentRaffle.targetAmount) *
                100,
            };
            setCurrentRaffle(updatedRaffle);

            // Update user activity by fetching the latest data
            const updatedActivity = await raffleApi.getUserActivity(address);
            setUserActivity(updatedActivity);

            // Show success message with referral code if this was the first purchase
            if (userReferralCode) {
              toast({
                title: "Tickets Purchased! 🎉",
                description: `You've purchased ${ticketCount} tickets for Raffle #${currentRaffle.id}.\n\nShare your referral link to earn rewards:\n${userReferralCode}`,
                duration: 10000,
              });
            } else {
              toast({
                title: "Tickets Purchased! 🎉",
                description: `You've purchased ${ticketCount} tickets for Raffle #${currentRaffle.id}.`,
                duration: 5000,
              });
            }

            // Check if raffle is completed
            if (
              currentRaffle.ticketsSold + ticketCount >=
              currentRaffle.targetAmount
            ) {
              toast({
                title: "Raffle Complete!",
                description:
                  "The raffle has reached its target amount. Drawing winner...",
              });
            }
          } catch (txError: any) {
            console.error("Transaction error details:", {
              error: txError,
              message: txError.message,
              data: txError.data,
              code: txError.code,
            });
            throw new Error(txError.message || "Transaction failed");
          }
        }

        // Add to user activity
        const newActivity: UserActivity = {
          id: tickets[0].id,
          type: "purchase",
          raffleId: currentRaffle.id,
          timestamp: new Date().toISOString(),
          ticketCount,
          totalSpent: ticketCount * RAFFLE.ticketPrice,
          token,
          ticketIds: tickets.map((t) => t.ticketNumber),
          status: "COMPLETED",
        };
      } catch (error: any) {
        console.error("Error purchasing tickets:", error);

        const errorMessage = decodeContractError(error);

        toast({
          title: "Purchase failed",
          description: errorMessage,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [
      isConnected,
      isCorrectNetwork,
      currentRaffle,
      address,
      walletClient,
      isWalletClientError,
      publicClient,
      setCurrentRaffle,
      setUserActivity,
      setIsLoading,
      toast,
    ]
  );

  return { purchaseTicket };
};
