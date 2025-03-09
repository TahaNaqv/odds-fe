
import { useState } from 'react';
import { formatAddress } from '@/utils/helpers';
import { WalletState } from './wallet/wallet-types';
import { useNetwork } from './wallet/use-network';
import { useAccounts } from './wallet/use-accounts';
import { useWalletListeners } from './wallet/use-wallet-listeners';

const useWallet = () => {
  const [walletState, setWalletState] = useState<WalletState>({
    address: null,
    isConnecting: false,
    isConnected: false,
    chainId: null,
    isCorrectNetwork: false,
  });

  // Initialize network related functionality
  const { 
    handleChainChanged, 
    switchNetwork, 
    checkNetworkStatus 
  } = useNetwork(setWalletState);

  // Initialize account related functionality
  const { 
    handleAccountsChanged, 
    connectWallet, 
    disconnectWallet 
  } = useAccounts(setWalletState, checkNetworkStatus);

  // Set up wallet event listeners
  useWalletListeners(
    { handleAccountsChanged, handleChainChanged },
    checkNetworkStatus,
    setWalletState
  );

  return {
    ...walletState,
    connectWallet,
    switchNetwork,
    disconnectWallet,
    formatAddress,
  };
};

export default useWallet;
