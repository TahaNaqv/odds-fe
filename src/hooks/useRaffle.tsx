
import { useState, useCallback, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import { MOCK_CURRENT_RAFFLE, MOCK_PAST_RAFFLES, MOCK_USER_ACTIVITY, TOKENS, RAFFLE } from '@/utils/constants';
import useWallet from './useWallet';

interface PurchaseTicketParams {
  ticketCount: number;
  token: 'USDC' | 'USDT';
}

interface SetAutoEnrollParams {
  enabled: boolean;
  endDate?: Date;
}

const useRaffle = () => {
  const { address, isConnected, isCorrectNetwork } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const [currentRaffle, setCurrentRaffle] = useState(MOCK_CURRENT_RAFFLE);
  const [pastRaffles, setPastRaffles] = useState(MOCK_PAST_RAFFLES);
  const [userActivity, setUserActivity] = useState(MOCK_USER_ACTIVITY);
  const [autoEnrollSettings, setAutoEnrollSettings] = useState({
    enabled: false,
    endDate: null as Date | null,
  });

  // Fetch current raffle
  const fetchCurrentRaffle = useCallback(async () => {
    // In a real app, this would fetch from the smart contract
    setIsLoading(true);
    
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // For now, just use the mock data with a dynamic timestamp
      const mockRaffle = {
        ...MOCK_CURRENT_RAFFLE,
        startTime: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
        endTime: new Date(Date.now() + 12 * 3600 * 1000).toISOString(),
      };
      
      setCurrentRaffle(mockRaffle);
    } catch (error) {
      console.error('Error fetching current raffle:', error);
      toast({
        title: 'Failed to load raffle',
        description: 'Unable to fetch the current raffle information.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch past raffles
  const fetchPastRaffles = useCallback(async () => {
    // In a real app, this would fetch from the smart contract
    setIsLoading(true);
    
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Just use mock data for now
      setPastRaffles(MOCK_PAST_RAFFLES);
    } catch (error) {
      console.error('Error fetching past raffles:', error);
      toast({
        title: 'Failed to load history',
        description: 'Unable to fetch the raffle history.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch user activity
  const fetchUserActivity = useCallback(async () => {
    if (!address) return;
    
    // In a real app, this would fetch from the smart contract based on the user's address
    setIsLoading(true);
    
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Just use mock data for now
      setUserActivity(MOCK_USER_ACTIVITY);
    } catch (error) {
      console.error('Error fetching user activity:', error);
      toast({
        title: 'Failed to load activity',
        description: 'Unable to fetch your activity history.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [address]);

  // Purchase ticket
  const purchaseTicket = useCallback(async ({ ticketCount, token }: PurchaseTicketParams) => {
    if (!isConnected) {
      toast({
        title: 'Wallet not connected',
        description: 'Please connect your wallet to purchase tickets.',
        variant: 'destructive',
      });
      return;
    }

    if (!isCorrectNetwork) {
      toast({
        title: 'Wrong network',
        description: 'Please switch to the Base network to purchase tickets.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulating transaction
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update mock data (in a real app, this would be a transaction to the smart contract)
      const cost = ticketCount * RAFFLE.ticketPrice;
      
      // Update current raffle
      setCurrentRaffle(prev => ({
        ...prev,
        ticketsSold: prev.ticketsSold + ticketCount,
        prizePool: prev.prizePool + cost,
      }));
      
      // Add to user activity
      const newActivity = {
        id: `activity-${Date.now()}`,
        type: 'purchase',
        raffleId: currentRaffle.id,
        timestamp: new Date().toISOString(),
        ticketCount,
        totalSpent: cost,
        token,
      };
      
      setUserActivity(prev => [newActivity, ...prev]);
      
      toast({
        title: 'Tickets purchased!',
        description: `Successfully purchased ${ticketCount} tickets for $${cost}.`,
      });
    } catch (error) {
      console.error('Error purchasing tickets:', error);
      toast({
        title: 'Purchase failed',
        description: 'Failed to purchase raffle tickets. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [isConnected, isCorrectNetwork, currentRaffle.id]);

  // Set auto-enroll
  const setAutoEnroll = useCallback(async ({ enabled, endDate }: SetAutoEnrollParams) => {
    if (!isConnected) {
      toast({
        title: 'Wallet not connected',
        description: 'Please connect your wallet to set auto-enrollment.',
        variant: 'destructive',
      });
      return;
    }

    if (!isCorrectNetwork) {
      toast({
        title: 'Wrong network',
        description: 'Please switch to the Base network to set auto-enrollment.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulating transaction
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Update auto-enroll settings
      setAutoEnrollSettings({
        enabled,
        endDate: endDate || null,
      });
      
      toast({
        title: enabled ? 'Auto-enroll enabled' : 'Auto-enroll disabled',
        description: enabled
          ? `You will be automatically enrolled in daily raffles until ${endDate?.toLocaleDateString()}.`
          : 'You have disabled auto-enrollment for future raffles.',
      });
    } catch (error) {
      console.error('Error setting auto-enroll:', error);
      toast({
        title: 'Setting failed',
        description: 'Failed to update auto-enrollment settings. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [isConnected, isCorrectNetwork]);

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
