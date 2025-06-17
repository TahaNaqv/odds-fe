
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, DollarSign, X } from 'lucide-react';

interface PastRaffleResultsModalProps {
  raffleId: string;
  totalTickets: number;
  prizePool: number;
}

const PastRaffleResultsModal = ({ raffleId, totalTickets, prizePool }: PastRaffleResultsModalProps) => {
  // Calculate ticket distribution (1/3rd each)
  const winnersCount = Math.floor(totalTickets / 3);
  const breakEvenCount = Math.floor(totalTickets / 3);
  const losersCount = totalTickets - winnersCount - breakEvenCount;

  // Generate ticket numbers for each category
  const winnerTickets = Array.from({ length: winnersCount }, (_, i) => i + 1);
  const breakEvenTickets = Array.from({ length: breakEvenCount }, (_, i) => i + winnersCount + 1);
  const loserTickets = Array.from({ length: losersCount }, (_, i) => i + winnersCount + breakEvenCount + 1);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          View All Ticket Results
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Raffle #{raffleId.split('-')[1]} - All Ticket Results
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Winners Section (2x return) */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Badge className="bg-green-100 text-green-800 border-green-300">
                🎉 2x Winners ({winnersCount} tickets)
              </Badge>
              <span className="text-sm text-muted-foreground">
                Won $2.00 each
              </span>
            </div>
            <div className="grid grid-cols-8 gap-2">
              {winnerTickets.map((ticketNum) => (
                <div 
                  key={ticketNum}
                  className="bg-green-100 border border-green-300 text-green-800 rounded-lg p-2 text-center text-sm font-medium"
                >
                  #{ticketNum}
                </div>
              ))}
            </div>
          </div>

          {/* Break Even Section ($1 return) */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Badge className="bg-blue-100 text-blue-800 border-blue-300">
                💰 Break Even ({breakEvenCount} tickets)
              </Badge>
              <span className="text-sm text-muted-foreground">
                Got $1.00 back
              </span>
            </div>
            <div className="grid grid-cols-8 gap-2">
              {breakEvenTickets.map((ticketNum) => (
                <div 
                  key={ticketNum}
                  className="bg-blue-100 border border-blue-300 text-blue-800 rounded-lg p-2 text-center text-sm font-medium"
                >
                  #{ticketNum}
                </div>
              ))}
            </div>
          </div>

          {/* Losers Section ($0 return) */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Badge className="bg-red-100 text-red-800 border-red-300">
                ❌ No Return ({losersCount} tickets)
              </Badge>
              <span className="text-sm text-muted-foreground">
                Lost $1.00
              </span>
            </div>
            <div className="grid grid-cols-8 gap-2">
              {loserTickets.map((ticketNum) => (
                <div 
                  key={ticketNum}
                  className="bg-red-100 border border-red-300 text-red-800 rounded-lg p-2 text-center text-sm font-medium"
                >
                  #{ticketNum}
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PastRaffleResultsModal;
