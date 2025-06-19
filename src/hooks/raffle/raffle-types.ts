import { TOKENS } from "@/utils/constants";

export interface Ticket {
  id: number;
  ticketNumber: number;
  groupNumber: number | null;
  prizeAmount: string;
  isDistributed: boolean;
  transactionHash: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface RaffleData {
  id: number;
  title: string;
  description: string;
  maxTickets: number;
  totalTickets: number;
  ticketPrice: string; // Keep as string for frontend formatting compatibility
  status: string;
  totalPrizeAmount: string;
  platformFee: string;
  referralRewards: string;
  distributedAmount: string;
  isDistributed: boolean;
  transactionHash: string;
  isCreated: boolean;
  tickets: Array<{
    id: number;
    ticketNumber: number;
    groupNumber: number | null;
    prizeAmount: string;
    isDistributed: boolean;
    transactionHash: string | null;
    createdAt: string;
    updatedAt: string;
  }>;
  createdAt: string;
  updatedAt: string;
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
  tickets: Ticket[];
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
