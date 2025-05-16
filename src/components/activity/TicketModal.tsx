
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar, PartyPopper, Ticket } from 'lucide-react';
import TicketList from './TicketList';
import { format, isFuture } from 'date-fns';

interface TicketModalProps {
  ticketIds: number[];
  winningTicket?: number;
  purchaseDate?: string; // Add date when tickets were purchased
}

const TicketModal = ({ ticketIds, winningTicket, purchaseDate }: TicketModalProps) => {
  const hasWinningTicket = ticketIds.includes(winningTicket || -1);
  const ticketCount = ticketIds.length;
  
  // Check if this is a future raffle entry (ticket IDs will be assigned when raffle starts)
  const ticketDate = purchaseDate ? new Date(purchaseDate) : null;
  const isFutureTicket = ticketDate ? isFuture(ticketDate) : false;

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
              {isFutureTicket ? "Future Entry" : "Tickets"}
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-popover border-border dialog-content">
        <DialogHeader>
          <DialogTitle className="text-high-contrast text-xl">
            {isFutureTicket 
              ? "Future Raffle Entry" 
              : hasWinningTicket 
                ? 'Winning Ticket' 
                : `${ticketCount} ${ticketCount === 1 ? 'Ticket' : 'Tickets'}`}
          </DialogTitle>
          <DialogDescription className="text-medium-contrast">
            {isFutureTicket 
              ? `Your tickets will be generated when the raffle starts on ${ticketDate ? format(ticketDate, 'PP') : 'the scheduled date'}.`
              : hasWinningTicket 
                ? 'Congratulations! You have a winning ticket.' 
                : 'Here are your ticket numbers for this raffle.'}
          </DialogDescription>
        </DialogHeader>
        
        {isFutureTicket ? (
          <div className="flex flex-col items-center justify-center p-8 space-y-4 text-center">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-secondary">
              <Calendar className="h-8 w-8 text-primary" />
            </div>
            <p className="text-medium-contrast">
              Your {ticketCount} {ticketCount === 1 ? 'ticket' : 'tickets'} will be assigned numbers when the raffle begins. 🎟️
            </p>
            {ticketDate && (
              <p className="text-sm text-muted-foreground">
                Scheduled for {format(ticketDate, 'PPP')}
              </p>
            )}
          </div>
        ) : (
          <TicketList ticketIds={ticketIds} winningTicket={winningTicket} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TicketModal;
