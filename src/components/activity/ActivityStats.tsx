
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Ticket, Trophy, TrendingUp } from "lucide-react";
import useRaffle from "@/hooks/useRaffle";
import useWallet from "@/hooks/useWallet";

const ActivityStats = () => {
  const { userActivity } = useRaffle();
  const { isConnected } = useWallet();
  const [stats, setStats] = useState({
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
  
  if (!isConnected) {
    return (
      <Card className="shadow-subtle">
        <CardContent className="p-6 text-center">
          <p className="text-medium-contrast">Connect your wallet to view your statistics</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="shadow-subtle bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20 border-blue-200 dark:border-blue-800">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Tickets</p>
              <h3 className="text-2xl font-bold text-high-contrast mt-1">{stats.totalTickets}</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <Ticket className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="mt-2 text-sm text-medium-contrast">
            <span className="font-medium">${stats.totalSpent.toFixed(2)}</span> total spent
          </div>
        </CardContent>
      </Card>
      
      <Card className="shadow-subtle bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950/30 dark:to-yellow-900/20 border-yellow-200 dark:border-yellow-800">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">Total Wins</p>
              <h3 className="text-2xl font-bold text-high-contrast mt-1">{stats.totalWins}</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
              <Trophy className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
          <div className="mt-2 text-sm text-medium-contrast">
            <span className="font-medium text-green-600 dark:text-green-400">${stats.totalWon.toFixed(2)}</span> total won
          </div>
        </CardContent>
      </Card>
      
      <Card className="shadow-subtle bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/20 border-green-200 dark:border-green-800">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600 dark:text-green-400">Win Rate</p>
              <h3 className="text-2xl font-bold text-high-contrast mt-1">{stats.winRate.toFixed(2)}%</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div className="mt-2 text-sm text-medium-contrast">
            Most active: {stats.mostTicketsDay || "N/A"}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivityStats;
