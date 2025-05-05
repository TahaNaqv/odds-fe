
import { useState, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';
import { AutoEnrollSettings, SetAutoEnrollParams } from './raffle-types';

export const useAutoEnroll = (
  isConnected: boolean,
  isCorrectNetwork: boolean,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const [autoEnrollSettings, setAutoEnrollSettings] = useState<AutoEnrollSettings>({
    enabled: false,
    endDate: null,
  });

  // Set auto-enroll
  const setAutoEnroll = useCallback(async ({ enabled, endDate }: SetAutoEnrollParams) => {
    if (!isConnected) {
      toast({
        title: 'Wallet not connected',
        description: 'Please connect your wallet to set auto-entry.',
        variant: 'destructive',
      });
      return;
    }

    if (!isCorrectNetwork) {
      toast({
        title: 'Wrong network',
        description: 'Please switch to the Base network to set auto-entry.',
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
        title: enabled ? 'Auto-Entry enabled' : 'Auto-Entry disabled',
        description: enabled
          ? `You will be automatically entered in daily raffles until ${endDate?.toLocaleDateString()}.`
          : 'You have disabled auto-entry for future raffles.',
      });
    } catch (error) {
      console.error('Error setting auto-entry:', error);
      toast({
        title: 'Setting failed',
        description: 'Failed to update auto-entry settings. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [isConnected, isCorrectNetwork, setIsLoading]);

  return {
    autoEnrollSettings,
    setAutoEnroll
  };
};
