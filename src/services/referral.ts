import axiosInstance from "@/lib/axios";

export interface LeaderboardEntry {
  wallet: string;
  referees: number;
  earnings: number;
  referralCode: string;
}

export const getLeaderboard = async (
  sortBy: "referees" | "earnings" = "earnings",
  order: "asc" | "desc" = "desc"
): Promise<LeaderboardEntry[]> => {
  const response = await axiosInstance.get(
    `/referral/leaderboard?sortBy=${sortBy}&order=${order}`
  );
  return response.data;
};

export const getUserReferralStats = async (
  wallet: string
): Promise<LeaderboardEntry | null> => {
  const response = await axiosInstance.get(
    `/referral/user-stats?wallet=${wallet}`
  );
  return response.data;
};
