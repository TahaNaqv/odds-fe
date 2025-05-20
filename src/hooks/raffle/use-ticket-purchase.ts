import { useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { RAFFLE } from "@/utils/constants";
import { raffleApi } from "@/api/raffle";
import { RaffleData, UserActivity, PurchaseTicketParams } from "./raffle-types";
import { useAppKitAccount } from "@reown/appkit/react";

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

        const { tickets, userReferralCode } = response;

        if (!tickets || tickets.length === 0) {
          throw new Error("No tickets were created");
        }

        // Update current raffle
        const updatedRaffle: RaffleData = {
          ...currentRaffle,
          ticketsSold: currentRaffle.ticketsSold + ticketCount,
          prizePool: currentRaffle.prizePool + ticketCount * RAFFLE.ticketPrice,
          progress:
            ((currentRaffle.ticketsSold + ticketCount) /
              currentRaffle.targetAmount) *
            100,
        };
        setCurrentRaffle(updatedRaffle);

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
      } catch (error: any) {
        console.error("Error purchasing tickets:", error);

        // Handle specific error cases
        if (error.response?.data?.message) {
          toast({
            title: "Purchase failed",
            description: error.response.data.message,
            variant: "destructive",
          });
        } else if (error.message?.includes("insufficient funds")) {
          toast({
            title: "Insufficient funds",
            description:
              "You don't have enough USDC to complete this purchase.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Purchase failed",
            description:
              error.message ||
              "Failed to purchase raffle tickets. Please try again.",
            variant: "destructive",
          });
        }
      } finally {
        setIsLoading(false);
      }
    },
    [
      isConnected,
      isCorrectNetwork,
      currentRaffle,
      setCurrentRaffle,
      setUserActivity,
      setIsLoading,
      toast,
      address,
    ]
  );

  return { purchaseTicket };
};
