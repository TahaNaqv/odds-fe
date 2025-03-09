
import { useCallback } from 'react';
import { toast } from '@/hooks/use-toast';
import { NETWORK } from '@/utils/constants';
import { switchToBaseNetwork } from '@/utils/helpers';

export const useNetwork = (
  setWalletState: (updater: (prev: any) => any) => void, 
  checkNetwork: (chainId: number) => boolean
) => {
  // Handle chain changed event
  const handleChainChanged = useCallback((chainId: string) => {
    const chainIdNum = parseInt(chainId, 16);
    
    setWalletState(prev => ({
      ...prev,
      chainId: chainIdNum,
      isCorrectNetwork: checkNetwork(chainIdNum),
    }));

    if (!checkNetwork(chainIdNum)) {
      toast({
        title: 'Network changed',
        description: `Please switch to the ${NETWORK.chainName} network.`,
        variant: 'destructive',
      });
    }
  }, [checkNetwork, setWalletState]);

  // Switch to Base network
  const switchNetwork = useCallback(async () => {
    try {
      await switchToBaseNetwork();
      
      // Check the current chain ID after switching
      const chainId = await window.ethereum?.request({ method: 'eth_chainId' });
      if (chainId) {
        const chainIdNum = parseInt(chainId, 16);
        
        setWalletState(prev => ({
          ...prev,
          chainId: chainIdNum,
          isCorrectNetwork: checkNetwork(chainIdNum),
        }));
        
        toast({
          title: 'Network switched',
          description: `Successfully switched to ${NETWORK.chainName} network.`,
        });
      }
    } catch (error) {
      console.error('Error switching network:', error);
      
      toast({
        title: 'Network switch failed',
        description: 'Failed to switch networks. Please try again.',
        variant: 'destructive',
      });
    }
  }, [checkNetwork, setWalletState]);

  // Check if the wallet is on the correct network
  const checkNetworkStatus = useCallback((chainId: number) => {
    return chainId === NETWORK.chainId;
  }, []);

  return { 
    handleChainChanged, 
    switchNetwork, 
    checkNetworkStatus 
  };
};
