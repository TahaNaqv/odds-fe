
import { NETWORK } from './constants';

// Format address to display as 0x1234...5678
export function formatAddress(address: string, chars = 4): string {
  if (!address) return '';
  return `${address.substring(0, chars + 2)}...${address.substring(address.length - chars)}`;
}

// Format date to display in a user-friendly way
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Calculate time remaining in the current raffle
export function getTimeRemaining(endTimeString: string): { hours: number; minutes: number; seconds: number } {
  const endTime = new Date(endTimeString).getTime();
  const now = Date.now();
  
  let timeRemaining = Math.max(0, endTime - now);
  
  const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
  timeRemaining -= hours * 1000 * 60 * 60;
  
  const minutes = Math.floor(timeRemaining / (1000 * 60));
  timeRemaining -= minutes * 1000 * 60;
  
  const seconds = Math.floor(timeRemaining / 1000);
  
  return { hours, minutes, seconds };
}

// Format time remaining in a user-friendly way
export function formatTimeRemaining(endTimeString: string): string {
  const { hours, minutes, seconds } = getTimeRemaining(endTimeString);
  
  if (hours > 0) {
    return `${hours}h ${minutes}m remaining`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds}s remaining`;
  } else {
    return `${seconds}s remaining`;
  }
}

// Calculate progress percentage
export function calculateProgress(current: number, max: number): number {
  return Math.min(100, Math.round((current / max) * 100));
}

// Request to switch to the Base network
export async function switchToBaseNetwork() {
  if (!window.ethereum) {
    throw new Error('No ethereum provider found. Please install MetaMask or another web3 wallet.');
  }

  try {
    // Try to switch to the Base network
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: `0x${NETWORK.chainId.toString(16)}` }],
    });
  } catch (switchError: any) {
    // This error code indicates that the chain has not been added to MetaMask
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: `0x${NETWORK.chainId.toString(16)}`,
              chainName: NETWORK.chainName,
              nativeCurrency: NETWORK.nativeCurrency,
              rpcUrls: NETWORK.rpcUrls,
              blockExplorerUrls: NETWORK.blockExplorerUrls,
            },
          ],
        });
      } catch (addError) {
        throw new Error('Failed to add the Base network to your wallet.');
      }
    } else {
      throw new Error('Failed to switch to the Base network.');
    }
  }
}

// Format currency to display as $X.XX
export function formatCurrency(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

// Get a random item from an array
export function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

// Truncate text with ellipsis
export function truncateText(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
}
