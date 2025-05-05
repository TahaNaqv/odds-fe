
import { Trophy } from "lucide-react";
import StatCard from "./StatCard";

interface TotalWinsCardProps {
  totalWins: number;
  totalWon: number;
}

const TotalWinsCard = ({ totalWins, totalWon }: TotalWinsCardProps) => {
  return (
    <StatCard
      title="Total Wins"
      value={totalWins}
      subtitle={<span className="font-medium text-green-600 dark:text-green-400">${totalWon.toFixed(2)} total won</span>}
      icon={Trophy}
      colorScheme="yellow"
    />
  );
};

export default TotalWinsCard;
