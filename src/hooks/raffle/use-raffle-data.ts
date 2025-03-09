
import { useState, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';
import { MOCK_CURRENT_RAFFLE, MOCK_PAST_RAFFLES, MOCK_USER_ACTIVITY } from '@/utils/constants';
import { RaffleData, UserActivity } from './raffle-types';

export const useRaffleData = (address: string | null) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentRaffle, setCurrentRaffle] = useState<RaffleData>(MOCK_CURRENT_RAFFLE);
  const [pastRaffles, setPastRaffles] = useState<RaffleData[]>(MOCK_PAST_RAFFLES);
  const [userActivity, setUserActivity] = useState<UserActivity[]>(MOCK_USER_ACTIVITY);

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

  return {
    isLoading,
    currentRaffle,
    setCurrentRaffle,
    pastRaffles,
    userActivity,
    setUserActivity,
    fetchCurrentRaffle,
    fetchPastRaffles,
    fetchUserActivity
  };
};
