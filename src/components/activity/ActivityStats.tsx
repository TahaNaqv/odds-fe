
import useRaffle from "@/hooks/useRaffle";
import useWallet from "@/hooks/useWallet";
import { useActivityStats } from "@/hooks/useActivityStats";
import ConnectWalletStatsCard from "./stats/ConnectWalletStatsCard";
import TotalTicketsCard from "./stats/TotalTicketsCard";
import TotalWinsCard from "./stats/TotalWinsCard";
import WinRateCard from "./stats/WinRateCard";

const ActivityStats = () => {
  const { userActivity } = useRaffle();
  const { isConnected } = useWallet();
  const stats = useActivityStats(userActivity);
  
  if (!isConnected) {
    return <ConnectWalletStatsCard />;
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <TotalTicketsCard 
        totalTickets={stats.totalTickets} 
        totalSpent={stats.totalSpent} 
      />
      <TotalWinsCard 
        totalWins={stats.totalWins} 
        totalWon={stats.totalWon} 
      />
      <WinRateCard 
        winRate={stats.winRate} 
        mostTicketsDay={stats.mostTicketsDay} 
      />
    </div>
  );
};

export default ActivityStats;
