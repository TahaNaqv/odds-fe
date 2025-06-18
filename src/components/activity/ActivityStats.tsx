import useRaffle from "@/hooks/useRaffle";
import { useActivityStatsFromAPI } from "@/hooks/useActivityStats";
import ConnectWalletStatsCard from "./stats/ConnectWalletStatsCard";
import TotalTicketsCard from "./stats/TotalTicketsCard";
import TotalWinsCard from "./stats/TotalWinsCard";
import WinRateCard from "./stats/WinRateCard";
import { useAppKitAccount } from "@reown/appkit/react";

const ActivityStats = () => {
  const { address, isConnected } = useAppKitAccount();
  const { stats, isLoading, error } = useActivityStatsFromAPI(address);

  if (!isConnected) {
    return <ConnectWalletStatsCard />;
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="h-24 bg-secondary animate-pulse rounded-lg"></div>
        <div className="h-24 bg-secondary animate-pulse rounded-lg"></div>
        <div className="h-24 bg-secondary animate-pulse rounded-lg"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">{error}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <TotalTicketsCard
        totalTickets={stats.totalTickets}
        totalSpent={stats.totalSpent}
      />
      <TotalWinsCard totalWins={stats.totalWins} totalWon={stats.totalWon} />
      <WinRateCard
        winRate={stats.winRate}
        mostTicketsDay={stats.mostTicketsDay}
      />
    </div>
  );
};

export default ActivityStats;
