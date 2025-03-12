
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
              ? 'bg-yellow-100 border border-yellow-300 text-yellow-800' 
              : 'bg-secondary text-high-contrast'
          }`}
        >
          <span className="font-semibold">Ticket #{ticketId}</span>
          {winningTicket === ticketId && (
            <Badge variant="warning" className="font-medium">
              Winner 🎉
            </Badge>
          )}
        </div>
      ))}
    </div>
  );
};

export default TicketList;
