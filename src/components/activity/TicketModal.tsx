
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PartyPopper, Ticket } from 'lucide-react';
import TicketList from './TicketList';

interface TicketModalProps {
  ticketIds: number[];
  winningTicket?: number;
}

const TicketModal = ({ ticketIds, winningTicket }: TicketModalProps) => {
  const hasWinningTicket = ticketIds.includes(winningTicket || -1);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="whitespace-nowrap">
          {hasWinningTicket ? (
            <>
              <PartyPopper className="h-4 w-4 mr-2 text-yellow-500" />
              Winner
            </>
          ) : (
            <>
              <Ticket className="h-4 w-4 mr-2" />
              Tickets
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {hasWinningTicket ? 'Winning Ticket' : 'Ticket Numbers'}
          </DialogTitle>
        </DialogHeader>
        <TicketList ticketIds={ticketIds} winningTicket={winningTicket} />
      </DialogContent>
    </Dialog>
  );
};

export default TicketModal;
