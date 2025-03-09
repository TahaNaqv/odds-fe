
import { TOKENS } from "@/utils/constants";

export interface RaffleData {
  id: string;
  startTime: string;
  endTime: string;
  ticketsSold: number;
  maxTickets: number;
  prizePool: number;
  winner?: string;
  winningTicket?: number;
}

export interface UserActivity {
  id: string;
  type: 'purchase' | 'win';
  raffleId: string;
  timestamp: string;
  ticketCount?: number;
  totalSpent?: number;
  token?: 'USDC' | 'USDT';
  prize?: number;
  winningTicket?: number;
}

export interface AutoEnrollSettings {
  enabled: boolean;
  endDate: Date | null;
}

export interface PurchaseTicketParams {
  ticketCount: number;
  token: keyof typeof TOKENS;
}

export interface SetAutoEnrollParams {
  enabled: boolean;
  endDate?: Date;
}
