
import { useEffect } from 'react';
import { WalletEvents, WalletState } from './wallet-types';

export const useWalletListeners = (
  events: WalletEvents,
  checkNetworkStatus: () => void,
  setWalletState: React.Dispatch<React.SetStateAction<WalletState>>
) => {
  // Set up event listeners when component mounts
  useEffect(() => {
    if (!window.ethereum) return;
    
    // Setup event listeners for wallet
    const { ethereum } = window;
    
    // Check initial connection state
    const checkInitialState = async () => {
      try {
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        
        if (accounts.length > 0) {
          setWalletState(prev => ({
            ...prev,
            address: accounts[0],
            isConnected: true,
          }));
          
          checkNetworkStatus();
        }
      } catch (error) {
        console.error('Error checking initial wallet state:', error);
      }
    };
    
    checkInitialState();
    
    // Add event listeners
    ethereum.on('accountsChanged', events.handleAccountsChanged);
    ethereum.on('chainChanged', events.handleChainChanged);
    
    // Cleanup: remove event listeners when component unmounts
    return () => {
      if (ethereum.removeListener) {
        ethereum.removeListener('accountsChanged', events.handleAccountsChanged);
        ethereum.removeListener('chainChanged', events.handleChainChanged);
      }
    };
  }, [events, checkNetworkStatus, setWalletState]);
};
