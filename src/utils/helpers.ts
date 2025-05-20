import { NETWORK } from "./constants";

// Format address to display as 0x1234...5678
export function formatAddress(address: string, length: number = 4): string {
  if (!address) return "";
  const lowerAddress = address.toLowerCase();
  return `${lowerAddress.slice(0, length + 2)}...${lowerAddress.slice(
    -length
  )}`;
}

// Format date to display in a user-friendly way
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Calculate time remaining in the current raffle
export function getTimeRemaining(endTimeString: string): {
  hours: number;
  minutes: number;
  seconds: number;
} {
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
    throw new Error(
      "No ethereum provider found. Please install MetaMask or another web3 wallet."
    );
  }

  try {
    // Try to switch to the Base network
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: `0x${NETWORK.chainId.toString(16)}` }],
    });
  } catch (switchError: any) {
    // This error code indicates that the chain has not been added to MetaMask
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
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
        throw new Error("Failed to add the Base network to your wallet.");
      }
    } else {
      throw new Error("Failed to switch to the Base network.");
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

// Generate a referral code from a wallet address
export function generateReferralCode(address: string): string {
  if (!address) return "";
  // Take first 4 chars and last 4 chars of the address and join them
  const prefix = address.substring(2, 6);
  const suffix = address.substring(address.length - 4);
  return `${prefix}${suffix}`.toLowerCase();
}

export function isValidReferralCode(code: string): boolean {
  return /^[a-z0-9]{8}$/.test(code.toLowerCase());
}

// Format referral link for sharing
export function formatReferralLink(referralCode: string): string {
  const baseUrl = window.location.origin;
  return `${baseUrl}/?ref=${referralCode.toLowerCase()}`;
}

// Format social share message for Twitter and Telegram
export function formatSocialShareMessage(
  raffleId: string,
  ticketCount: number,
  referralLink: string
): string {
  return `I'm in Raffle #${raffleId} with ${ticketCount} ticket(s) on Ødds 🎲\nOne ticket. One shot. One win. 💸\n👉 ${referralLink}`;
}

// Open Twitter share dialog
export function shareOnTwitter(message: string): void {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    message
  )}`;
  window.open(twitterUrl, "_blank", "width=550,height=420");
}

// Open Telegram share dialog
export function shareOnTelegram(message: string): void {
  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(
    window.location.origin
  )}&text=${encodeURIComponent(message)}`;
  window.open(telegramUrl, "_blank");
}

// Copy text to clipboard
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error("Failed to copy text:", error);
    return false;
  }
}

// Navigate to the theme preview
export function previewNeonTheme() {
  window.location.href = "/theme/neon-nights";
}
