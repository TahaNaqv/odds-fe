import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Validate a referral code format (8 alphanumeric characters)
export function isValidReferralCode(code: string): boolean {
  // Check if the code follows the pattern of first 4 characters + last 4 characters from an address
  // Expected pattern: 8 alphanumeric characters, lowercase
  return /^[a-f0-9]{8}$/.test(code);
}
