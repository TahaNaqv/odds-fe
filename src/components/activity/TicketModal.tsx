
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
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
        <Button variant="outline" size="sm" className="whitespace-nowrap shadow-subtle font-medium">
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
      <DialogContent className="bg-popover border-border">
        <DialogHeader>
          <DialogTitle className="text-high-contrast text-xl">
            {hasWinningTicket ? 'Winning Ticket' : 'Ticket Numbers'}
          </DialogTitle>
          <DialogDescription className="text-medium-contrast">
            {hasWinningTicket 
              ? 'Congratulations! You have a winning ticket.' 
              : 'Here are your ticket numbers for this raffle.'}
          </DialogDescription>
        </DialogHeader>
        <TicketList ticketIds={ticketIds} winningTicket={winningTicket} />
      </DialogContent>
    </Dialog>
  );
};

export default TicketModal;
