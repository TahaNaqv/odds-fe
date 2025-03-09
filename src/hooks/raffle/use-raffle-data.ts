
import { useState, useCallback } from 'react';
import { MOCK_CURRENT_RAFFLE, MOCK_PAST_RAFFLES, MOCK_USER_ACTIVITY } from '@/utils/constants';
import { RaffleData, UserActivity } from './raffle-types';

export const useRaffleData = (address?: string | null) => {
  const [currentRaffle, setCurrentRaffle] = useState<RaffleData>(MOCK_CURRENT_RAFFLE);
  const [pastRaffles, setPastRaffles] = useState<RaffleData[]>(MOCK_PAST_RAFFLES);
  const [userActivity, setUserActivity] = useState<UserActivity[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize user activity from mock data, ensuring type compatibility
  useState(() => {
    const typedActivity: UserActivity[] = MOCK_USER_ACTIVITY.map(activity => ({
      ...activity,
      type: activity.type as "purchase" | "win", // Ensure type property is correctly typed
      token: activity.token as "USDC" | "USDT" | undefined // Ensure token property is correctly typed
    }));
    setUserActivity(typedActivity);
  });

  // Fetch current raffle data
  const fetchCurrentRaffle = useCallback(async () => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call to get current raffle data
      // For now, we'll simulate a delay and use mock data
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCurrentRaffle(MOCK_CURRENT_RAFFLE);
    } catch (error) {
      console.error('Error fetching current raffle:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch past raffles
  const fetchPastRaffles = useCallback(async () => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call to get past raffle data
      // For now, we'll simulate a delay and use mock data
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPastRaffles(MOCK_PAST_RAFFLES);
    } catch (error) {
      console.error('Error fetching past raffles:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch user activity
  const fetchUserActivity = useCallback(async () => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call to get user activity data
      // For now, we'll simulate a delay and use mock data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Convert mock data to properly typed UserActivity objects
      const typedActivity: UserActivity[] = MOCK_USER_ACTIVITY.map(activity => ({
        ...activity,
        type: activity.type as "purchase" | "win",
        token: activity.token as "USDC" | "USDT" | undefined
      }));
      
      setUserActivity(typedActivity);
    } catch (error) {
      console.error('Error fetching user activity:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    currentRaffle,
    setCurrentRaffle,
    pastRaffles,
    userActivity,
    setUserActivity,
    isLoading,
    fetchCurrentRaffle,
    fetchPastRaffles,
    fetchUserActivity
  };
};
