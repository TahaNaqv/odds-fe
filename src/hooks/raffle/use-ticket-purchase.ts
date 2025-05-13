
import { useCallback } from 'react';
import { toast } from '@/hooks/use-toast';
import { RAFFLE } from '@/utils/constants';
import { PurchaseTicketParams, RaffleData, UserActivity } from './raffle-types';
import { generateReferralCode, formatReferralLink, isValidReferralCode } from '@/utils/helpers';
import { showReferralToast } from '@/components/raffle/ReferralShareToast';

export const useTicketPurchase = (
  isConnected: boolean,
  isCorrectNetwork: boolean,
  currentRaffle: RaffleData,
  setCurrentRaffle: React.Dispatch<React.SetStateAction<RaffleData>>,
  setUserActivity: React.Dispatch<React.SetStateAction<UserActivity[]>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  // Purchase ticket
  const purchaseTicket = useCallback(async ({ ticketCount, token, autoEnrollEndDate, referralCode }: PurchaseTicketParams) => {
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
    
    // Validate referral code
    if (!referralCode || !isValidReferralCode(referralCode)) {
      toast({
        title: 'Invalid referral code',
        description: 'Please enter a valid referral code to purchase tickets.',
        variant: 'destructive',
      });
      return;
    }

    // Check if buying these tickets would exceed the target amount
    const remainingTickets = currentRaffle.targetAmount - currentRaffle.ticketsSold;
    if (ticketCount > remainingTickets) {
      toast({
        title: 'Too many tickets',
        description: `Only ${remainingTickets} tickets are available for this raffle.`,
        variant: 'destructive',
      });
      
      // Automatically adjust to the remaining amount
      ticketCount = remainingTickets;
      if (ticketCount <= 0) return;
      
      toast({
        title: 'Adjusted ticket count',
        description: `Your purchase has been adjusted to ${ticketCount} tickets.`,
      });
    }

    setIsLoading(true);
    
    try {
      // Simulating transaction
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update mock data (in a real app, this would be a transaction to the smart contract)
      const cost = ticketCount * RAFFLE.ticketPrice;
      
      // Check if this purchase completes the raffle
      const newTicketsSold = currentRaffle.ticketsSold + ticketCount;
      const raffleCompleted = newTicketsSold >= currentRaffle.targetAmount;
      
      // Update current raffle
      setCurrentRaffle(prev => {
        const updated = {
          ...prev,
          ticketsSold: newTicketsSold,
          prizePool: prev.prizePool + cost,
          progress: (newTicketsSold / prev.targetAmount) * 100,
        };
        
        // If the raffle is completed, set the end time
        if (raffleCompleted) {
          updated.endTime = new Date().toISOString();
        }
        
        return updated;
      });
      
      // Add to user activity
      const newActivity: UserActivity = {
        id: `activity-${Date.now()}`,
        type: 'purchase',
        raffleId: currentRaffle.id,
        timestamp: new Date().toISOString(),
        ticketCount,
        totalSpent: cost,
        token: 'USDC',
        referralCode, // Include the referral code
      };
      
      setUserActivity(prev => [newActivity, ...prev]);
      
      // Generate referral code based on wallet address (in a real app, this would come from the connected wallet)
      // Using a mock address for demonstration
      const mockWalletAddress = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e";
      const newReferralCode = generateReferralCode(mockWalletAddress);
      const referralLink = formatReferralLink(newReferralCode);
      
      // Show toast with referral link and social sharing
      showReferralToast(
        currentRaffle.id.replace('raffle-', ''), 
        ticketCount, 
        referralLink
      );
      
      // If auto-enroll is enabled, add that information in console (in a real implementation this would update state)
      if (autoEnrollEndDate) {
        console.log(`Auto-Entry activated until ${autoEnrollEndDate.toLocaleDateString()}`);
      }
      
      // If the raffle is completed, simulate drawing and starting a new raffle
      if (raffleCompleted) {
        // Show toast that raffle has completed
        toast({
          title: 'Raffle Complete!',
          description: 'The raffle has reached its target amount. Drawing winner...',
        });
        
        // Simulate delay for drawing
        setTimeout(() => {
          // In a real implementation, this would trigger the smart contract to draw the raffle
          console.log("Raffle completed, drawing winner and starting new raffle...");
          
          // In a real app, this would be handled by the smart contract events
          // For this simulation, we'll handle it in the next user activity fetch
        }, 2000);
      }
      
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
  }, [isConnected, isCorrectNetwork, currentRaffle, setCurrentRaffle, setUserActivity, setIsLoading]);

  return { purchaseTicket };
};
