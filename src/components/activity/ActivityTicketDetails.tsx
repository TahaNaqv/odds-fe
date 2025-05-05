
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { UserActivity } from "@/hooks/raffle/raffle-types";
import { Trophy, Ticket, Clock } from "lucide-react";
import { formatCurrency } from "@/utils/helpers";
import TicketList from "../activity/TicketList";

interface ActivityTicketDetailsProps {
  activities: UserActivity[];
  date: Date;
}

const ActivityTicketDetails = ({ activities, date }: ActivityTicketDetailsProps) => {
  // Group by activity type
  const purchases = activities.filter(activity => activity.type === "purchase");
  const wins = activities.filter(activity => activity.type === "win");
  
  // Calculate totals
  const totalTickets = purchases.reduce((sum, activity) => sum + (activity.ticketCount || 0), 0);
  const totalSpent = purchases.reduce((sum, activity) => sum + (activity.totalSpent || 0), 0);
  const totalWon = wins.reduce((sum, activity) => sum + (activity.prize || 0), 0);
  
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          {format(date, "MMMM d, yyyy")}
        </h3>
        <Badge variant="outline" className="font-medium">
          {totalTickets} Tickets
        </Badge>
      </div>
      
      {/* Summary */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Ticket className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">Purchases</span>
          </div>
          <p className="text-lg font-bold">{formatCurrency(totalSpent)}</p>
          <p className="text-xs text-muted-foreground">{purchases.length} entries</p>
        </div>
        
        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Trophy className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
            <span className="text-sm font-semibold text-yellow-700 dark:text-yellow-300">Winnings</span>
          </div>
          <p className="text-lg font-bold">{formatCurrency(totalWon)}</p>
          <p className="text-xs text-muted-foreground">{wins.length} wins</p>
        </div>
      </div>
      
      <Separator className="my-4" />
      
      {/* Ticket lists */}
      {wins.length > 0 && (
        <div className="mb-4">
          <h4 className="font-medium text-sm text-yellow-700 dark:text-yellow-300 mb-2">Winning Tickets</h4>
          {wins.map((win) => (
            <div key={win.id} className="mb-2">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">Raffle #{win.raffleId.split('-')[1]}</span>
                <span className="text-green-600 dark:text-green-400 font-medium">{formatCurrency(win.prize || 0)}</span>
              </div>
              {win.ticketIds && win.winningTicket && (
                <TicketList 
                  ticketIds={win.ticketIds} 
                  winningTicket={win.winningTicket} 
                />
              )}
            </div>
          ))}
        </div>
      )}
      
      {purchases.length > 0 && (
        <div>
          <h4 className="font-medium text-sm text-blue-700 dark:text-blue-300 mb-2">Purchased Tickets</h4>
          {purchases.map((purchase) => (
            <div key={purchase.id} className="mb-2">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">Raffle #{purchase.raffleId.split('-')[1]}</span>
                <span className="font-medium">{purchase.ticketCount} tickets • {formatCurrency(purchase.totalSpent || 0)}</span>
              </div>
              {purchase.ticketIds && (
                <TicketList 
                  ticketIds={purchase.ticketIds} 
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivityTicketDetails;
