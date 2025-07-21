import { useCallback, useEffect, useState } from "react";
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import { ethers } from "ethers";
import axiosInstance from "@/lib/axios";
import type { Eip1193Provider } from "ethers";

export const useAuth = () => {
  const { address, isConnected } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider("eip155");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const signMessage = useCallback(
    async (message: string) => {
      if (!walletProvider || !address) {
        throw new Error("Wallet not connected");
      }

      const provider = new ethers.BrowserProvider(
        walletProvider as Eip1193Provider
      );
      const signer = await provider.getSigner();
      return signer.signMessage(message);
    },
    [walletProvider, address]
  );

  const authenticate = useCallback(async () => {
    if (!isConnected || !address) {
      throw new Error("Wallet not connected");
    }

    if (isAuthenticating) {
      return; // Prevent multiple simultaneous authentication attempts
    }

    setIsAuthenticating(true);

    try {
      // Generate a message for the user to sign
      const message = `Welcome to Odds!\n\nClick to sign in and accept the Odds Terms of Service.\n\nThis request will not trigger a blockchain transaction or cost any gas fees.`;

      // Get the signature
      const signature = await signMessage(message);

      // Send to backend for verification
      const response = await axiosInstance.post("/auth/wallet", {
        walletAddress: address.toLowerCase(),
        signature,
        message,
      });

      // Store the JWT token
      localStorage.setItem("token", response.data.access_token);
      setIsAuthenticated(true);

      return response.data;
    } catch (error) {
      console.error("Authentication error:", error);
      setIsAuthenticated(false);
      throw error;
    } finally {
      setIsAuthenticating(false);
    }
  }, [isConnected, address, signMessage, isAuthenticating]);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  }, []);

  const getToken = useCallback(() => {
    return localStorage.getItem("token");
  }, []);

  // Handle wallet connection/disconnection
  useEffect(() => {
    if (isConnected && address) {
      // Check if we already have a token
      const token = getToken();
      if (!token) {
        // REMOVE or COMMENT OUT this block:
        // authenticate().catch((error) => {
        //   console.error("Failed to authenticate:", error);
        // });
      } else {
        setIsAuthenticated(true);
      }
    } else {
      // If wallet is disconnected, log out
      logout();
    }
  }, [isConnected, address, authenticate, logout, getToken]);

  return {
    isConnected,
    isAuthenticated,
    isAuthenticating,
    address,
    authenticate,
    logout,
    getToken,
  };
};
