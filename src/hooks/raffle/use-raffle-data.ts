import { useState, useCallback, useEffect } from 'react';
import { RaffleData, UserActivity } from './raffle-types';
import { raffleApi } from '@/services/raffle';

export const useRaffleData = (address?: string | null) => {
  const [currentRaffle, setCurrentRaffle] = useState<RaffleData | null>(null);
  const [pastRaffles, setPastRaffles] = useState<RaffleData[]>([]);
  const [userActivity, setUserActivity] = useState<UserActivity[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch current raffle data
  const fetchCurrentRaffle = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await raffleApi.getCurrentRaffle();
      setCurrentRaffle(data);
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
      const { raffles } = await raffleApi.getPastRaffles();
      setPastRaffles(raffles);
    } catch (error) {
      console.error('Error fetching past raffles:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch user activity
  const fetchUserActivity = useCallback(async () => {
    if (!address) return;
    
    setIsLoading(true);
    try {
      const data = await raffleApi.getUserActivity(address);
      setUserActivity(data);
    } catch (error) {
      console.error('Error fetching user activity:', error);
    } finally {
      setIsLoading(false);
    }
  }, [address]);

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
