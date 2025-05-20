import { toast } from '@/components/ui/use-toast';

export const showReferralToast = (raffleId: string, ticketCount: number, referralLink: string) => {
  toast({
    title: 'Tickets Purchased! ��',
    description: `You've purchased ${ticketCount} tickets for Raffle #${raffleId}.\n\nShare your referral link to earn rewards:\n${referralLink}`,
    duration: 10000,
  });
}; 