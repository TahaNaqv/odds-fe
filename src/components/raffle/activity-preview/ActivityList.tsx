
import { UserActivity } from "../../../hooks/raffle/raffle-types";
import ActivityItem from "../../activity/ActivityItem";

interface ActivityListProps {
  activities: UserActivity[];
}

const ActivityList = ({ activities }: ActivityListProps) => {
  return (
    <>
      <div className="space-y-4 mb-4">
        {activities.slice(0, 5).map((activity) => (
          <ActivityItem key={activity.id} activity={activity} />
        ))}
      </div>
      
      <div className="text-center text-sm text-muted-foreground mb-6">
        Showing 5 of {activities.length} activities
      </div>
    </>
  );
};

export default ActivityList;
