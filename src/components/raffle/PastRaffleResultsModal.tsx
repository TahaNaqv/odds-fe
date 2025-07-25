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

                {/* 🏆 Prize Legend */}
                <div className="flex items-center gap-2 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded border border-yellow-600"></div>
                    <span className="text-gray-600">1st Place</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-gradient-to-r from-gray-300 to-gray-400 rounded border border-gray-500"></div>
                    <span className="text-gray-600">2nd Place</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-red-100 rounded border border-red-300"></div>
                    <span className="text-gray-600">No Prize</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-8 gap-2">
                {tickets.map((ticket) => {
                  const getTicketStyles = (groupNumber) => {
                    switch (groupNumber) {
                      case 1: // 🥇 First Place - Gold
                        return "bg-gradient-to-r from-yellow-400 to-yellow-500 border-yellow-600 text-yellow-900 shadow-lg ring-2 ring-yellow-300";
                      case 2: // 🥈 Second Place - Silver
                        return "bg-gradient-to-r from-gray-300 to-gray-400 border-gray-500 text-gray-900 shadow-md ring-2 ring-gray-300";
                      case 3: // ❌ No Prize - Red
                        return "bg-red-50 border-red-200 text-red-700";
                      default: // ⏳ Pending - Gray
                        return "bg-gray-50 border-gray-200 text-gray-700";
                    }
                  };

                  const getTicketIcon = (groupNumber) => {
                    switch (groupNumber) {
                      case 1:
                        return "🥇";
                      case 2:
                        return "🥈";
                      case 3:
                        return "❌";
                      default:
                        return "T";
                    }
                  };

                  return (
                    <div
                      key={ticket.id}
                      className={`${getTicketStyles(ticket.groupNumber)} rounded-lg p-2 text-center text-sm font-medium transition-all duration-200 hover:scale-105 relative`}
                    >
                      <div className="flex flex-col items-center">
                        <span className="text-xs">
                          {getTicketIcon(ticket.groupNumber)}
                        </span>
                        <span>#{ticket.ticketNumber}</span>
                      </div>

                      {/* 💰 Prize amount tooltip */}
                      {Number(ticket.prizeAmount) > 0 && (
                        <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                          $
                        </div>
                      )}
                    </div>
                  );
                })}
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
