import axiosInstance from "@/lib/axios";
import { RaffleData, UserActivity } from "@/hooks/raffle/raffle-types";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const raffleApi = {
  // Get current raffle
  getCurrentRaffle: async (): Promise<RaffleData> => {
    const response = await axiosInstance.get(`${apiUrl}/raffles/current`);
    return response.data;
  },

  // Get past raffles with pagination
  getPastRaffles: async (page: number = 1, limit: number = 10) => {
    const response = await axiosInstance.get(`${apiUrl}/raffles/past`, {
      params: { page, limit },
    });
    return response.data;
  },

  // Get user activity
  getUserActivity: async (walletAddress: string): Promise<UserActivity[]> => {
    const response = await axiosInstance.get(
      `${apiUrl}/raffles/user/${walletAddress}/activity`
    );
    return response.data;
  },

  // Get user activity statistics
  getUserActivityStats: async (walletAddress: string) => {
    const response = await axiosInstance.get(
      `${apiUrl}/raffles/user/${walletAddress}/activity/stats`
    );
    return response.data;
  },

  // Purchase tickets
  purchaseTicket: async (
    raffleId: number,
    data: {
      ticketCount: number;
      token: string;
      walletAddress: string;
      autoEntry: number;
      referralCode: string;
    }
  ) => {
    const response = await axiosInstance.post(
      `${apiUrl}/raffles/${raffleId}/purchase`,
      data
    );
    return response.data;
  },

  // Set auto-enrollment
  // setAutoEnroll: async (data: {
  //   walletAddress: string;
  //   endDate: Date;
  //   ticketCount: number;
  //   token: string;
  // }) => {
  //   const response = await axiosInstance.post(
  //     `${apiUrl}/raffles/auto-enroll`,
  //     data
  //   );
  //   return response.data;
  // },

  // Get raffle tickets
  getRaffleTickets: async (
    raffleId: string,
    page: number = 1,
    limit: number = 10
  ) => {
    const response = await axiosInstance.get(
      `${apiUrl}/raffles/${raffleId}/tickets`,
      {
        params: { page, limit },
      }
    );
    return response.data;
  },

  // Get raffle winner
  getRaffleWinner: async (raffleId: string) => {
    const response = await axiosInstance.get(
      `${apiUrl}/raffles/${raffleId}/winner`
    );
    return response.data;
  },

  // Get active raffles
  getActiveRaffles: async () => {
    const response = await axiosInstance.get(`${apiUrl}/raffles/active`);
    return response.data;
  },
};
