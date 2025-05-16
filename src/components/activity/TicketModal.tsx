
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PartyPopper, Ticket, Clock } from 'lucide-react';
import TicketList from './TicketList';
import { format, isFuture } from 'date-fns';

interface TicketModalProps {
  ticketIds?: number[];
  winningTicket?: number;
  timestamp?: string;
}

const TicketModal = ({ ticketIds = [], winningTicket, timestamp }: TicketModalProps) => {
  const hasWinningTicket = ticketIds.includes(winningTicket || -1);
  const ticketCount = ticketIds.length;
  
  // Check if the tickets are for a future date
  const ticketDate = timestamp ? new Date(timestamp) : null;
  const isFutureEntry = ticketDate && isFuture(ticketDate);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="whitespace-nowrap shadow-subtle font-medium dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
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
      <DialogContent className="bg-popover border-border dialog-content">
        <DialogHeader>
          <DialogTitle className="text-high-contrast text-xl">
            {hasWinningTicket ? 'Winning Ticket' : `${ticketCount} ${ticketCount === 1 ? 'Ticket' : 'Tickets'}`}
          </DialogTitle>
          <DialogDescription className="text-medium-contrast">
            {hasWinningTicket 
              ? 'Congratulations! You have a winning ticket.' 
              : isFutureEntry
                ? `Auto-enrolled tickets for ${ticketDate ? format(ticketDate, 'MMMM d, yyyy') : 'future date'}`
                : 'Here are your ticket numbers for this raffle.'}
          </DialogDescription>
        </DialogHeader>
        
        {isFutureEntry ? (
          <div className="p-8 text-center text-medium-contrast">
            <Clock className="h-16 w-16 mx-auto mb-4 text-blue-400" />
            <h3 className="text-lg font-medium mb-2">Future Entry</h3>
            <p>
              Your tickets will be generated when the raffle opens on {ticketDate ? format(ticketDate, 'MMMM d, yyyy') : 'the scheduled date'}.
            </p>
          </div>
        ) : (
          <TicketList ticketIds={ticketIds} winningTicket={winningTicket} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TicketModal;
