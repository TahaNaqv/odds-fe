
import { useState, useEffect } from 'react';
import useWallet from './useWallet';
import { useRaffleData } from './raffle/use-raffle-data';
import { useTicketPurchase } from './raffle/use-ticket-purchase';
import { useAutoEnroll } from './raffle/use-auto-enroll';
import { PurchaseTicketParams, SetAutoEnrollParams } from './raffle/raffle-types';

const useRaffle = () => {
  const { address, isConnected, isCorrectNetwork } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  
  // Compose smaller hooks
  const {
    currentRaffle,
    setCurrentRaffle,
    pastRaffles,
    userActivity,
    setUserActivity,
    fetchCurrentRaffle,
    fetchPastRaffles,
    fetchUserActivity
  } = useRaffleData(address);
  
  const { purchaseTicket } = useTicketPurchase(
    isConnected,
    isCorrectNetwork,
    currentRaffle,
    setCurrentRaffle,
    setUserActivity,
    setIsLoading
  );
  
  const { autoEnrollSettings, setAutoEnroll } = useAutoEnroll(
    isConnected,
    isCorrectNetwork,
    setIsLoading
  );

  // Load initial data
  useEffect(() => {
    fetchCurrentRaffle();
    fetchPastRaffles();
    
    if (isConnected) {
      fetchUserActivity();
    }
  }, [fetchCurrentRaffle, fetchPastRaffles, fetchUserActivity, isConnected]);

  return {
    isLoading,
    currentRaffle,
    pastRaffles,
    userActivity,
    autoEnrollSettings,
    purchaseTicket,
    setAutoEnroll,
    refreshCurrentRaffle: fetchCurrentRaffle,
    refreshUserActivity: fetchUserActivity,
    refreshPastRaffles: fetchPastRaffles,
  };
};

export default useRaffle;
