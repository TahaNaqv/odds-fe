
import { useState, useEffect } from "react";
import { UserActivity } from "@/hooks/raffle/raffle-types";

export interface ActivityStats {
  totalTickets: number;
  totalWins: number;
  totalSpent: number;
  totalWon: number;
  winRate: number;
  mostTicketsDay: string;
}

export const useActivityStats = (userActivity: UserActivity[]) => {
  const [stats, setStats] = useState<ActivityStats>({
    totalTickets: 0,
    totalWins: 0,
    totalSpent: 0,
    totalWon: 0,
    winRate: 0,
    mostTicketsDay: "",
  });
  
  useEffect(() => {
    if (userActivity.length > 0) {
      // Calculate statistics from user activity
      const purchases = userActivity.filter(activity => activity.type === "purchase");
      const wins = userActivity.filter(activity => activity.type === "win");
      
      const totalTickets = purchases.reduce((sum, activity) => sum + (activity.ticketCount || 0), 0);
      const totalSpent = purchases.reduce((sum, activity) => sum + (activity.totalSpent || 0), 0);
      const totalWon = wins.reduce((sum, activity) => sum + (activity.prize || 0), 0);
      
      // Find day with most tickets
      const ticketsByDay = purchases.reduce((acc, activity) => {
        const date = new Date(activity.timestamp).toLocaleDateString();
        acc[date] = (acc[date] || 0) + (activity.ticketCount || 0);
        return acc;
      }, {} as Record<string, number>);
      
      let mostTicketsDay = "";
      let mostTickets = 0;
      
      Object.entries(ticketsByDay).forEach(([date, count]) => {
        if (count > mostTickets) {
          mostTickets = count;
          mostTicketsDay = date;
        }
      });
      
      // Calculate win rate
      const winRate = totalTickets > 0 ? (wins.length / totalTickets) * 100 : 0;
      
      setStats({
        totalTickets,
        totalWins: wins.length,
        totalSpent,
        totalWon,
        winRate,
        mostTicketsDay,
      });
    }
  }, [userActivity]);

  return stats;
};
