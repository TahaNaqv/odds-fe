
import { useCallback } from 'react';
import { toast } from '@/hooks/use-toast';
import { formatAddress } from '@/utils/helpers';
import { NETWORK } from '@/utils/constants';

export const useAccounts = (
  setWalletState: (updater: (prev: any) => any) => void,
  checkNetwork: (chainId: number) => boolean
) => {
  // Handle account changed event
  const handleAccountsChanged = useCallback((accounts: string[]) => {
    if (accounts.length === 0) {
      // User has disconnected their wallet
      setWalletState(prev => ({
        ...prev,
        address: null,
        isConnected: false,
      }));
      toast({
        title: 'Wallet disconnected',
        description: 'Your wallet has been disconnected.',
      });
    } else {
      setWalletState(prev => ({
        ...prev,
        address: accounts[0],
        isConnected: true,
      }));
    }
  }, [setWalletState]);

  // Connect wallet
  const connectWallet = useCallback(async () => {
    if (!window.ethereum) {
      toast({
        title: 'Wallet not found',
        description: 'Please install MetaMask or another Web3 wallet.',
        variant: 'destructive',
      });
      return;
    }

    setWalletState(prev => ({ ...prev, isConnecting: true }));

    try {
      // Request account access
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      // Get the current chain ID
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      const chainIdNum = parseInt(chainId, 16);
      const isCorrectNetwork = checkNetwork(chainIdNum);

      setWalletState({
        address: accounts[0],
        isConnecting: false,
        isConnected: true,
        chainId: chainIdNum,
        isCorrectNetwork,
      });

      // If not on the correct network, prompt to switch
      if (!isCorrectNetwork) {
        toast({
          title: 'Wrong network',
          description: `Please switch to the ${NETWORK.chainName} network.`,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Wallet connected',
          description: `Connected to ${formatAddress(accounts[0])}`,
        });
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      setWalletState({
        address: null,
        isConnecting: false,
        isConnected: false,
        chainId: null,
        isCorrectNetwork: false,
      });
      
      toast({
        title: 'Connection failed',
        description: 'Failed to connect wallet. Please try again.',
        variant: 'destructive',
      });
    }
  }, [checkNetwork, setWalletState]);

  // Disconnect wallet (for UI purposes only)
  const disconnectWallet = useCallback(() => {
    setWalletState({
      address: null,
      isConnecting: false,
      isConnected: false,
      chainId: null,
      isCorrectNetwork: false,
    });
    
    toast({
      title: 'Wallet disconnected',
      description: 'You have been disconnected from your wallet.',
    });
  }, [setWalletState]);

  return {
    handleAccountsChanged,
    connectWallet,
    disconnectWallet
  };
};
