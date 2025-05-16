
import { format } from "date-fns";
import { Ticket, Calendar } from "lucide-react";
import { UserActivity } from "@/hooks/raffle/raffle-types";
import TicketModal from "./TicketModal";

interface ActivityTicketDetailsProps {
  activities: UserActivity[];
  date: Date;
}

const ActivityTicketDetails = ({ activities, date }: ActivityTicketDetailsProps) => {
  // Filter to just purchase activities
  const purchaseActivities = activities.filter(activity => activity.type === "purchase");
  
  // Extract all ticket IDs from the purchase activities
  const ticketIds: number[] = [];
  
  purchaseActivities.forEach(activity => {
    // Generate mock ticket IDs for this activity based on the activity ID
    // In a real app, these would come from the blockchain
    const activityNumber = parseInt(activity.id.split('-')[1]);
    const baseTicketId = activityNumber * 1000;
    
    for (let i = 0; i < (activity.ticketCount || 0); i++) {
      ticketIds.push(baseTicketId + i);
    }
  });
  
  // Get any winning activities for this date
  const winActivity = activities.find(activity => activity.type === "win");
  const winningTicket = winActivity ? (parseInt(winActivity.id.split('-')[1]) * 1000) : undefined;

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-2 text-primary" />
          <h3 className="text-sm font-semibold">{format(date, "MMMM d, yyyy")}</h3>
        </div>
        <TicketModal 
          ticketIds={ticketIds} 
          winningTicket={winningTicket}
          purchaseDate={date.toISOString()} // Pass the purchase date to the modal
        />
      </div>
      
      <div>
        {purchaseActivities.map((activity, index) => (
          <div key={index} className="py-2 border-t border-border/30 first:border-t-0">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium flex items-center">
                <Ticket className="h-3.5 w-3.5 mr-1.5 text-primary" />
                {activity.ticketCount} Ticket{activity.ticketCount !== 1 ? 's' : ''} Purchased
                {activity.referralCode ? "" : " via Auto-entry"}
              </span>
              <span className="text-xs text-muted-foreground">
                {format(new Date(activity.timestamp), "h:mm a")}
              </span>
            </div>
            {activity.referralCode && (
              <div className="text-xs text-muted-foreground mt-1">
                Referral: {activity.referralCode}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityTicketDetails;
