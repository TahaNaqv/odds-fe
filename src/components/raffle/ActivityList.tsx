
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Ticket } from "lucide-react";
import { formatDate } from "@/utils/helpers";
import { UserActivity } from "@/hooks/raffle/raffle-types";

interface AutoEnrolledActivity extends UserActivity {
  isAutoEnrolled?: boolean;
  autoEnrollId?: string;
  autoEnrollEndDate?: string;
}

interface ActivityListProps {
  activities: AutoEnrolledActivity[];
  limit?: number;
}

const ActivityList = ({ activities, limit }: ActivityListProps) => {
  const displayActivities = limit ? activities.slice(0, limit) : activities;
  
  return (
    <div className="space-y-4 mb-4">
      {displayActivities.map((activity) => (
        <ActivityItem key={activity.id} activity={activity} />
      ))}
      
      {limit && activities.length > limit && (
        <div className="text-center text-sm text-muted-foreground mb-6">
          Showing {limit} of {activities.length} activities
        </div>
      )}
    </div>
  );
};

const ActivityItem = ({ activity }: { activity: AutoEnrolledActivity }) => {
  return (
    <Card className="shadow-subtle border border-raffle-light-gray">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full flex items-center justify-center bg-raffle-light-blue">
              <Ticket className="h-5 w-5 text-raffle-blue" />
            </div>
            
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium">
                  Ticket Purchase
                </h3>
                <Badge className="text-xs bg-raffle-light-blue text-raffle-blue border-none">
                  Purchase
                </Badge>
                {activity.isAutoEnrolled && (
                  <Badge className="text-xs bg-green-100 text-green-700 border-none">
                    Auto-enrolled
                  </Badge>
                )}
                {activity.autoEnrollId && (
                  <Badge className="text-xs bg-blue-100 text-blue-700 border-none">
                    Plan #{activity.autoEnrollId.split('-')[2]}
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {formatDate(activity.timestamp)} • Raffle #{activity.raffleId.split('-')[1]}
              </p>
            </div>
          </div>
          
          <div className="text-right">
            <p className="font-semibold">
              {activity.ticketCount} Ticket{activity.ticketCount !== 1 ? 's' : ''}
            </p>
            <p className="text-sm text-muted-foreground">
              ${activity.totalSpent?.toFixed(2)} • {activity.token}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityList;
