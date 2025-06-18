import { useState, useEffect } from "react";
import { useRaffleData } from "./raffle/use-raffle-data";
import { useTicketPurchase } from "./raffle/use-ticket-purchase";
import { useAutoEnroll } from "./raffle/use-auto-enroll";
import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import { NETWORK } from "@/utils/constants";

const useRaffle = () => {
  const { address, isConnected } = useAppKitAccount();
  const { chainId } = useAppKitNetwork();
  const isCorrectNetwork = chainId === NETWORK.chainId;
  const [isLoading, setIsLoading] = useState(false);

  // Compose smaller hooks
  const {
    currentRaffle,
    setCurrentRaffle,
    pastRaffles,
    userActivity,
    setUserActivity,
    activeRaffles,
    fetchCurrentRaffle,
    fetchPastRaffles,
    fetchActiveRaffles,
    fetchUserActivity,
  } = useRaffleData(address);

  const { purchaseTicket } = useTicketPurchase(
    isConnected,
    isCorrectNetwork,
    currentRaffle,
    setCurrentRaffle,
    setUserActivity,
    setIsLoading
  );

  // Add the auto-enroll hook
  const { autoEnrollSettings, setAutoEnroll } = useAutoEnroll(
    isConnected,
    isCorrectNetwork,
    setIsLoading
  );

  // Load initial data
  useEffect(() => {
    fetchCurrentRaffle();
    fetchPastRaffles();
    fetchActiveRaffles();

    if (isConnected) {
      fetchUserActivity();
    }
  }, [
    fetchCurrentRaffle,
    fetchPastRaffles,
    fetchActiveRaffles,
    fetchUserActivity,
    isConnected,
  ]);

  // Check if the raffle has completed and needs to refresh
  useEffect(() => {
    if (currentRaffle?.endTime) {
      // If the raffle has ended (reached target), refresh after a short delay
      const timer = setTimeout(() => {
        fetchCurrentRaffle();
        fetchPastRaffles();
        fetchActiveRaffles();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [
    currentRaffle?.endTime,
    fetchCurrentRaffle,
    fetchPastRaffles,
    fetchActiveRaffles,
  ]);

  return {
    isLoading,
    currentRaffle,
    pastRaffles,
    userActivity,
    activeRaffles,
    purchaseTicket,
    // Add auto enrollment properties to the returned object
    autoEnrollSettings,
    setAutoEnroll,
    refreshCurrentRaffle: fetchCurrentRaffle,
    refreshUserActivity: fetchUserActivity,
    refreshPastRaffles: fetchPastRaffles,
    refreshActiveRaffles: fetchActiveRaffles,
  };
};

export default useRaffle;
