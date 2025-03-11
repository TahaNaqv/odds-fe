
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Ticket } from 'lucide-react';
import TicketList from './TicketList';

interface TicketModalProps {
  ticketIds: number[];
  winningTicket?: number;
}

const TicketModal = ({ ticketIds, winningTicket }: TicketModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="whitespace-nowrap">
          <Ticket className="h-4 w-4 mr-2" />
          Tickets
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ticket Numbers</DialogTitle>
        </DialogHeader>
        <TicketList ticketIds={ticketIds} winningTicket={winningTicket} />
      </DialogContent>
    </Dialog>
  );
};

export default TicketModal;
