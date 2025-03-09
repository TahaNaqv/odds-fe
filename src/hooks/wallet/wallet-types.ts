
export interface WalletState {
  address: string | null;
  isConnecting: boolean;
  isConnected: boolean;
  chainId: number | null;
  isCorrectNetwork: boolean;
}

export interface WalletEvents {
  handleAccountsChanged: (accounts: string[]) => void;
  handleChainChanged: (chainId: string) => void;
}
