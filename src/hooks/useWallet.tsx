
import { useState, useEffect, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';
import { formatAddress, switchToBaseNetwork } from '@/utils/helpers';
import { NETWORK } from '@/utils/constants';

interface WalletState {
  address: string | null;
  isConnecting: boolean;
  isConnected: boolean;
  chainId: number | null;
  isCorrectNetwork: boolean;
}

const useWallet = () => {
  const [walletState, setWalletState] = useState<WalletState>({
    address: null,
    isConnecting: false,
    isConnected: false,
    chainId: null,
    isCorrectNetwork: false,
  });

  // Check if the wallet is on the correct network
  const checkNetwork = useCallback((chainId: number) => {
    return chainId === NETWORK.chainId;
  }, []);

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
  }, []);

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
  }, [checkNetwork]);

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
  }, [checkNetwork]);

  // Switch to Base network
  const switchNetwork = useCallback(async () => {
    try {
      await switchToBaseNetwork();
      
      // Check the current chain ID after switching
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
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
    } catch (error) {
      console.error('Error switching network:', error);
      
      toast({
        title: 'Network switch failed',
        description: 'Failed to switch networks. Please try again.',
        variant: 'destructive',
      });
    }
  }, [checkNetwork]);

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
  }, []);

  // Set up event listeners
  useEffect(() => {
    if (window.ethereum) {
      // Check if wallet is already connected
      window.ethereum.request({ method: 'eth_accounts' })
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            window.ethereum.request({ method: 'eth_chainId' })
              .then((chainId: string) => {
                const chainIdNum = parseInt(chainId, 16);
                setWalletState({
                  address: accounts[0],
                  isConnecting: false,
                  isConnected: true,
                  chainId: chainIdNum,
                  isCorrectNetwork: checkNetwork(chainIdNum),
                });
              });
          }
        })
        .catch(console.error);

      // Set up event listeners
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
      
      // Clean up event listeners
      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, [handleAccountsChanged, handleChainChanged, checkNetwork]);

  return {
    ...walletState,
    connectWallet,
    switchNetwork,
    disconnectWallet,
    formatAddress,
  };
};

export default useWallet;
