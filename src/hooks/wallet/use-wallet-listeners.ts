
import { useEffect } from 'react';
import { WalletEvents } from './wallet-types';

export const useWalletListeners = (
  events: WalletEvents,
  checkNetwork: (chainId: number) => boolean,
  setWalletState: (updater: (prev: any) => any) => void
) => {
  // Set up event listeners
  useEffect(() => {
    if (window.ethereum) {
      // Check if wallet is already connected
      window.ethereum.request({ method: 'eth_accounts' })
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            window.ethereum?.request({ method: 'eth_chainId' })
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
      window.ethereum.on('accountsChanged', events.handleAccountsChanged);
      window.ethereum.on('chainChanged', events.handleChainChanged);
      
      // Clean up event listeners
      return () => {
        window.ethereum?.removeListener('accountsChanged', events.handleAccountsChanged);
        window.ethereum?.removeListener('chainChanged', events.handleChainChanged);
      };
    }
  }, [events.handleAccountsChanged, events.handleChainChanged, checkNetwork, setWalletState]);
};
