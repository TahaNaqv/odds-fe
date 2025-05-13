
import { useState, useCallback, useEffect } from 'react';
import { MOCK_CURRENT_RAFFLE, MOCK_PAST_RAFFLES, MOCK_USER_ACTIVITY } from '@/utils/constants';
import { RaffleData, UserActivity } from './raffle-types';

export const useRaffleData = (address?: string | null) => {
  const [currentRaffle, setCurrentRaffle] = useState<RaffleData>(MOCK_CURRENT_RAFFLE);
  const [pastRaffles, setPastRaffles] = useState<RaffleData[]>(MOCK_PAST_RAFFLES);
  const [userActivity, setUserActivity] = useState<UserActivity[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize user activity from mock data, ensuring type compatibility
  useEffect(() => {
    const typedActivity: UserActivity[] = MOCK_USER_ACTIVITY.map(activity => ({
      ...activity,
      type: activity.type as "purchase" | "win", 
      token: activity.token as "USDC" | "USDT" | undefined,
      // Ensure ticket IDs are present (adding mock values if not in the data)
      ticketIds: Array.from({ length: activity.ticketCount || 0 }, (_, i) => 1000 + i + Math.floor(Math.random() * 1000))
    }));
    setUserActivity(typedActivity);
  }, []);

  // Fetch current raffle data
  const fetchCurrentRaffle = useCallback(async () => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call to get current raffle data
      // For now, we'll simulate a delay and use mock data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if the current raffle has ended (reached target)
      if (currentRaffle.endTime) {
        // If ended, create a new raffle
        const newRaffleId = `raffle-${String(parseInt(currentRaffle.id.split('-')[1]) + 1).padStart(3, '0')}`;
        
        // Move current raffle to past raffles
        setPastRaffles(prev => [
          {
            ...currentRaffle,
            winner: "0x4f...b2e8", // Mock winner
            winningTicket: Math.floor(Math.random() * currentRaffle.ticketsSold) + 1,
            winnerGroup: Math.random() > 0.7 ? "Double" : "Equal" // Randomly assign a winner group
          },
          ...prev
        ]);
        
        // Create new raffle
        setCurrentRaffle({
          id: newRaffleId,
          startTime: new Date().toISOString(),
          endTime: null,
          ticketsSold: 0,
          maxTickets: 1000,
          targetAmount: 1000,
          prizePool: 0,
          progress: 0
        });
        
        // Notify about new raffle
        console.log(`New raffle started: ${newRaffleId}`);
      } else {
        // Just refresh the current raffle state
        setCurrentRaffle(prev => ({
          ...prev,
          progress: (prev.ticketsSold / prev.targetAmount) * 100
        }));
      }
    } catch (error) {
      console.error('Error fetching current raffle:', error);
    } finally {
      setIsLoading(false);
    }
  }, [currentRaffle]);

  // Fetch past raffles
  const fetchPastRaffles = useCallback(async () => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call to get past raffle data
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
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Convert mock data to properly typed UserActivity objects
      const typedActivity: UserActivity[] = MOCK_USER_ACTIVITY.map(activity => ({
        ...activity,
        type: activity.type as "purchase" | "win",
        token: activity.token as "USDC" | "USDT" | undefined,
        // Generate mock ticket IDs
        ticketIds: Array.from({ length: activity.ticketCount || 0 }, (_, i) => 1000 + i + Math.floor(Math.random() * 1000))
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
