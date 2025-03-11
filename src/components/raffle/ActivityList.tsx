
import { useState, useMemo } from "react";
import { UserActivity } from "@/hooks/raffle/raffle-types";
import ActivityItem from "../activity/ActivityItem";
import ListHeader from "./ListHeader";
import SortingBar from "./SortingBar";

interface AutoEnrolledActivity extends UserActivity {
  isAutoEnrolled?: boolean;
  autoEnrollId?: string;
  autoEnrollEndDate?: string;
}

interface ActivityListProps {
  activities: AutoEnrolledActivity[];
  limit?: number;
}

type SortField = "date" | "tickets" | "amount";
type SortDirection = "asc" | "desc";
type FilterOption = "all" | "auto" | "manual";

const ActivityList = ({ activities, limit }: ActivityListProps) => {
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [filterType, setFilterType] = useState<FilterOption>("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };
  
  const filteredAndSortedActivities = useMemo(() => {
    let result = [...activities];
    
    if (filterType === "auto") {
      result = result.filter(activity => activity.isAutoEnrolled);
    } else if (filterType === "manual") {
      result = result.filter(activity => !activity.isAutoEnrolled);
    }
    
    if (searchTerm) {
      const lowercaseSearch = searchTerm.toLowerCase();
      result = result.filter(activity => 
        activity.raffleId.toLowerCase().includes(lowercaseSearch) ||
        (activity.token && activity.token.toLowerCase().includes(lowercaseSearch))
      );
    }
    
    return result.sort((a, b) => {
      if (sortField === "date") {
        const dateA = new Date(a.timestamp).getTime();
        const dateB = new Date(b.timestamp).getTime();
        return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
      } else if (sortField === "tickets") {
        const ticketsA = a.ticketCount || 0;
        const ticketsB = b.ticketCount || 0;
        return sortDirection === "asc" ? ticketsA - ticketsB : ticketsB - ticketsA;
      } else if (sortField === "amount") {
        const amountA = a.totalSpent || 0;
        const amountB = b.totalSpent || 0;
        return sortDirection === "asc" ? amountA - amountB : amountB - amountA;
      }
      return 0;
    });
  }, [activities, sortField, sortDirection, filterType, searchTerm]);
  
  const displayActivities = limit ? filteredAndSortedActivities.slice(0, limit) : filteredAndSortedActivities;
  
  return (
    <div className="space-y-4 mb-4">
      <ListHeader 
        filterType={filterType}
        searchTerm={searchTerm}
        onFilterChange={setFilterType}
        onSearchChange={setSearchTerm}
      />
      
      <SortingBar 
        sortField={sortField} 
        sortDirection={sortDirection} 
        onSort={handleSort}
      />
      
      {displayActivities.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No activities match your filters
        </div>
      ) : (
        <>
          {displayActivities.map((activity) => (
            <ActivityItem key={activity.id} activity={activity} />
          ))}
          
          {limit && filteredAndSortedActivities.length > limit && (
            <div className="text-center text-sm text-muted-foreground mb-6">
              Showing {limit} of {filteredAndSortedActivities.length} activities
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ActivityList;
