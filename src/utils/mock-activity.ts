
import { UserActivity } from "@/hooks/raffle/raffle-types";

interface AutoEnrolledActivity extends UserActivity {
  isAutoEnrolled?: boolean;
  autoEnrollId?: string;
  autoEnrollEndDate?: string;
  ticketIds?: number[];
}

export interface AutoEnrollment {
  id: string;
  startDate: Date;
  endDate: Date;
  dailyTickets: number;
  token: string;
  status: 'active' | 'inactive';
}

export function generateMockActivities(): AutoEnrolledActivity[] {
  const activities: AutoEnrolledActivity[] = [];
  
  const startDate = new Date();
  const endDate = new Date('2025-03-15');
  
  const diffTime = endDate.getTime() - startDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  for (let i = 0; i < Math.min(10, diffDays + 1); i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    
    const autoEnrollId = i % 2 === 0 ? "auto-enroll-1" : "auto-enroll-2";
    const ticketCount = i % 2 === 0 ? 5 : 3;
    const token = i % 2 === 0 ? 'USDC' : 'USDT';
    
    // Generate unique ticket IDs for each activity
    const ticketIds = Array.from(
      { length: ticketCount }, 
      (_, index) => 1000 + (i * 10) + index
    );
    
    // Every third activity has a winning ticket (for demonstration)
    const winningTicket = i % 3 === 0 ? ticketIds[0] : undefined;
    
    activities.push({
      id: `preview-activity-${i}`,
      type: 'purchase',
      raffleId: `raffle-${1000 + i}`,
      timestamp: date.toISOString(),
      ticketCount: ticketCount,
      totalSpent: ticketCount,
      token: token as 'USDC' | 'USDT',
      isAutoEnrolled: i > 0,
      autoEnrollId: i > 0 ? autoEnrollId : undefined,
      autoEnrollEndDate: i === 0 ? endDate.toISOString() : undefined,
      ticketIds: ticketIds,
      winningTicket: winningTicket
    });
  }
  
  return activities;
}

export function getMockAutoEnrollments(): AutoEnrollment[] {
  return [
    {
      id: "auto-enroll-1",
      startDate: new Date(),
      endDate: new Date('2025-03-15'),
      dailyTickets: 5,
      token: 'USDC',
      status: 'active'
    },
    {
      id: "auto-enroll-2",
      startDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      endDate: new Date('2025-01-01'),
      dailyTickets: 3,
      token: 'USDT',
      status: 'active'
    },
    {
      id: "auto-enroll-3",
      startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      endDate: new Date('2024-01-01'),
      dailyTickets: 2,
      token: 'USDC',
      status: 'inactive'
    }
  ];
}
