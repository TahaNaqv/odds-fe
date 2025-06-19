import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, DollarSign, X } from "lucide-react";

interface Ticket {
  id: number;
  ticketNumber: number;
  groupNumber: number | null;
  prizeAmount: string;
  isDistributed: boolean;
  transactionHash: string | null;
  createdAt: string;
  updatedAt: string;
}

interface Raffle {
  id: number;
  tickets: Ticket[];
}

interface PastRaffleResultsModalProps {
  raffle: Raffle;
}

const PastRaffleResultsModal = ({ raffle }: PastRaffleResultsModalProps) => {
  const { tickets } = raffle;

  // If any ticket has groupNumber null, show all tickets simple
  const hasNullGroup = tickets.some((t) => t.groupNumber === null);

  // Group tickets by groupNumber if all are set
  const group1 = tickets.filter((t) => t.groupNumber === 1);
  const group2 = tickets.filter((t) => t.groupNumber === 2);
  const group3 = tickets.filter((t) => t.groupNumber === 3);

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
            Raffle #{raffle.id} - All Ticket Results
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {hasNullGroup ? (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge className="bg-gray-100 text-gray-800 border-gray-300">
                  All Tickets ({tickets.length})
                </Badge>
              </div>
              <div className="grid grid-cols-8 gap-2">
                {tickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="bg-gray-100 border border-gray-300 text-gray-800 rounded-lg p-2 text-center text-sm font-medium"
                  >
                    #{ticket.ticketNumber}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Winners Section (2x return) */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-green-100 text-green-800 border-green-300">
                    🎉 2x Winners ({group1.length} tickets)
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    Won $2.00 each
                  </span>
                </div>
                <div className="grid grid-cols-8 gap-2">
                  {group1.map((ticket) => (
                    <div
                      key={ticket.id}
                      className="bg-green-100 border border-green-300 text-green-800 rounded-lg p-2 text-center text-sm font-medium"
                    >
                      #{ticket.ticketNumber}
                    </div>
                  ))}
                </div>
              </div>
              {/* Break Even Section ($1 return) */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-blue-100 text-blue-800 border-blue-300">
                    💰 Break Even ({group2.length} tickets)
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    Got $1.00 back
                  </span>
                </div>
                <div className="grid grid-cols-8 gap-2">
                  {group2.map((ticket) => (
                    <div
                      key={ticket.id}
                      className="bg-blue-100 border border-blue-300 text-blue-800 rounded-lg p-2 text-center text-sm font-medium"
                    >
                      #{ticket.ticketNumber}
                    </div>
                  ))}
                </div>
              </div>
              {/* Losers Section ($0 return) */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-red-100 text-red-800 border-red-300">
                    ❌ No Return ({group3.length} tickets)
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    Lost $1.00
                  </span>
                </div>
                <div className="grid grid-cols-8 gap-2">
                  {group3.map((ticket) => (
                    <div
                      key={ticket.id}
                      className="bg-red-100 border border-red-300 text-red-800 rounded-lg p-2 text-center text-sm font-medium"
                    >
                      #{ticket.ticketNumber}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PastRaffleResultsModal;
