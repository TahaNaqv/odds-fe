
import { UserActivity } from "../hooks/raffle/raffle-types";

export function generateMockActivities(): UserActivity[] {
  const activities: UserActivity[] = [];
  
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
      autoEnrollEndDate: i === 0 ? endDate.toISOString() : undefined
    });
  }
  
  return activities;
}
