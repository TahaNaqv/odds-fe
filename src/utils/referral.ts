export const generateReferralCode = (walletAddress: string): string => {
  // Take first 6 characters of wallet address and convert to uppercase
  return walletAddress.slice(0, 6).toUpperCase();
};
 
export const formatReferralLink = (referralCode: string): string => {
  const baseUrl = window.location.origin;
  return `${baseUrl}/home/?ref=${referralCode}`;
}; 