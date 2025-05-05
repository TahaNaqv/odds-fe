
import { Ticket } from "lucide-react";
import StatCard from "./StatCard";

interface TotalTicketsCardProps {
  totalTickets: number;
  totalSpent: number;
}

const TotalTicketsCard = ({ totalTickets, totalSpent }: TotalTicketsCardProps) => {
  return (
    <StatCard
      title="Total Tickets"
      value={totalTickets}
      subtitle={<span>$<span className="font-medium">{totalSpent.toFixed(2)}</span> total spent</span>}
      icon={Ticket}
      colorScheme="blue"
    />
  );
};

export default TotalTicketsCard;
