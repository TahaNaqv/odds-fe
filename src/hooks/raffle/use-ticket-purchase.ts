
import { useCallback } from 'react';
import { toast } from '@/hooks/use-toast';
import { RAFFLE } from '@/utils/constants';
import { PurchaseTicketParams, RaffleData, UserActivity } from './raffle-types';

export const useTicketPurchase = (
  isConnected: boolean,
  isCorrectNetwork: boolean,
  currentRaffle: RaffleData,
  setCurrentRaffle: React.Dispatch<React.SetStateAction<RaffleData>>,
  setUserActivity: React.Dispatch<React.SetStateAction<UserActivity[]>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
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
        type: 'purchase' as const,
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
  }, [isConnected, isCorrectNetwork, currentRaffle.id, setCurrentRaffle, setUserActivity, setIsLoading]);

  return { purchaseTicket };
};
