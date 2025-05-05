
import { TrendingUp } from "lucide-react";
import StatCard from "./StatCard";

interface WinRateCardProps {
  winRate: number;
  mostTicketsDay: string;
}

const WinRateCard = ({ winRate, mostTicketsDay }: WinRateCardProps) => {
  return (
    <StatCard
      title="Win Rate"
      value={`${winRate.toFixed(2)}%`}
      subtitle={`Most active: ${mostTicketsDay || "N/A"}`}
      icon={TrendingUp}
      colorScheme="green"
    />
  );
};

export default WinRateCard;
