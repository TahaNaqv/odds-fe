
import { useCallback } from 'react';
import { toast } from '@/hooks/use-toast';
import { NETWORK } from '@/utils/constants';
import { WalletState } from './wallet-types';

type WalletStateUpdater = React.Dispatch<React.SetStateAction<WalletState>>;

export const useAccounts = (
  setWalletState: WalletStateUpdater,
  checkNetworkStatus: () => void
) => {
  // Handle accounts changed event
  const handleAccountsChanged = useCallback(
    (accounts: string[]) => {
      console.log('Accounts changed:', accounts);
      
      if (accounts.length === 0) {
        // User has disconnected all accounts
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
        // User has connected or switched accounts
        const newAddress = accounts[0];
        
        setWalletState(prev => ({
          ...prev,
          address: newAddress,
          isConnected: true,
        }));
        
        checkNetworkStatus();
        
        toast({
          title: 'Wallet connected',
          description: `Connected to address: ${newAddress.slice(0, 6)}...${newAddress.slice(-4)}`,
        });
      }
    },
    [setWalletState, checkNetworkStatus]
  );

  // Connect wallet
  const connectWallet = useCallback(async () => {
    if (!window.ethereum) {
      toast({
        title: 'No wallet detected',
        description: 'Please install MetaMask or another compatible wallet.',
        variant: 'destructive',
      });
      return;
    }
    
    setWalletState(prev => ({
      ...prev,
      isConnecting: true,
    }));
    
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      handleAccountsChanged(accounts);
    } catch (error) {
      console.error('Error connecting wallet:', error);
      let errorMessage = 'Failed to connect wallet';
      
      // @ts-ignore
      if (error && error.code === 4001) {
        errorMessage = 'You rejected the connection request';
      }
      
      toast({
        title: 'Connection failed',
        description: errorMessage,
        variant: 'destructive',
      });
      
      setWalletState(prev => ({
        ...prev,
        isConnecting: false,
      }));
    }
  }, [setWalletState, handleAccountsChanged]);

  // Disconnect wallet (for UI purposes only, can't force disconnect from MetaMask)
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
      description: 'You have disconnected your wallet from the app.',
    });
  }, [setWalletState]);

  return {
    handleAccountsChanged,
    connectWallet,
    disconnectWallet,
  };
};
