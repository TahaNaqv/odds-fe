
import { Badge } from '@/components/ui/badge';

interface TicketListProps {
  ticketIds: number[];
  winningTicket?: number;
}

const TicketList = ({ ticketIds, winningTicket }: TicketListProps) => {
  if (!ticketIds || ticketIds.length === 0) {
    return <p className="text-muted-foreground">No tickets available</p>;
  }

  return (
    <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
      {ticketIds.map((ticketId) => (
        <div 
          key={ticketId} 
          className={`flex items-center justify-between p-3 rounded-lg ${
            winningTicket === ticketId 
              ? 'bg-yellow-50 border border-yellow-200' 
              : 'bg-muted'
          }`}
        >
          <span className="font-medium">Ticket #{ticketId}</span>
          {winningTicket === ticketId && (
            <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-none">
              Winner 🎉
            </Badge>
          )}
        </div>
      ))}
    </div>
  );
};

export default TicketList;
