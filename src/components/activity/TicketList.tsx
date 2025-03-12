
import { Badge } from '@/components/ui/badge';

interface TicketListProps {
  ticketIds: number[];
  winningTicket?: number;
}

const TicketList = ({ ticketIds, winningTicket }: TicketListProps) => {
  if (!ticketIds || ticketIds.length === 0) {
    return <p className="text-medium-contrast">No tickets available</p>;
  }

  return (
    <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
      {ticketIds.map((ticketId) => (
        <div 
          key={ticketId} 
          className={`flex items-center justify-between p-3 rounded-lg ${
            winningTicket === ticketId 
              ? 'bg-yellow-100 border border-yellow-300 text-yellow-800 dark:bg-yellow-900/30 dark:border-yellow-700 dark:text-yellow-300' 
              : 'bg-secondary text-high-contrast'
          }`}
        >
          <span className="font-semibold">Ticket #{ticketId}</span>
          {winningTicket === ticketId && (
            <Badge variant="warning" className="font-medium bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200">
              Winner 🎉
            </Badge>
          )}
        </div>
      ))}
    </div>
  );
};

export default TicketList;
