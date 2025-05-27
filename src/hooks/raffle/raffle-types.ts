import { TOKENS } from "@/utils/constants";

export interface RaffleData {
  id: string;
  startTime: string;
  endTime: string | null; // Now can be null as the raffle ends when target is reached
  ticketsSold: number;
  maxTickets: number;
  targetAmount: number; // Target amount to reach ($1000)
  prizePool: number;
  progress: number; // Percentage of target reached
  winner?: string;
  winningTicket?: number;
}

export interface UserActivity {
  id: string;
  type: "purchase" | "win";
  raffleId: string;
  timestamp: string;
  ticketCount?: number;
  totalSpent?: number;
  token?: "USDC" | "USDT" | "mUSDC";
  prize?: number;
  winningTicket?: number;
  ticketIds?: number[];
  referralCode?: string; // Added referralCode property
  isAutoEnrolled?: boolean;
  autoEnrollId?: string;
  status?: "PENDING" | "COMPLETED" | "FAILED";
}

export interface AutoEnrollSettings {
  enabled: boolean;
  endDate: Date | null;
}

export interface PurchaseTicketParams {
  ticketCount: number;
  token: keyof typeof TOKENS;
  autoEntry: number;
  referralCode: string;
}

export interface SetAutoEnrollParams {
  enabled: boolean;
  endDate?: Date;
}
