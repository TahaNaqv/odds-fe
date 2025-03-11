
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
    <div className="space-y-2">
      {ticketIds.map((ticketId) => (
        <div key={ticketId} className="flex items-center gap-2 p-2 bg-muted rounded-lg">
          <span>Ticket #{ticketId}</span>
          {winningTicket === ticketId && (
            <span role="img" aria-label="celebration">🎉</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default TicketList;
