
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Ticket } from "lucide-react";
import { formatDate } from "@/utils/helpers";
import { UserActivity } from "@/hooks/raffle/raffle-types";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

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
    // First apply filters
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
    
    // Then sort
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
  
  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? 
      <ArrowUp className="h-3 w-3 ml-1" /> : 
      <ArrowDown className="h-3 w-3 ml-1" />;
  };
  
  return (
    <div className="space-y-4 mb-4">
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-1">
          <Input
            placeholder="Search by raffle ID or token"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex gap-2 items-center">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select 
            value={filterType} 
            onValueChange={(value: FilterOption) => setFilterType(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Purchases</SelectItem>
              <SelectItem value="auto">Auto-enrolled only</SelectItem>
              <SelectItem value="manual">Manual only</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex justify-between items-center px-4 py-2 bg-muted rounded-md text-sm font-medium">
        <div className="w-1/2">
          <Button 
            variant="ghost" 
            onClick={() => handleSort("date")}
            className="text-xs h-6 px-2 flex items-center"
          >
            Date
            <SortIcon field="date" />
          </Button>
        </div>
        <div className="w-1/2 text-right flex justify-end gap-2">
          <Button 
            variant="ghost" 
            onClick={() => handleSort("tickets")}
            className="text-xs h-6 px-2 flex items-center"
          >
            Tickets
            <SortIcon field="tickets" />
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => handleSort("amount")}
            className="text-xs h-6 px-2 flex items-center"
          >
            Amount
            <SortIcon field="amount" />
          </Button>
        </div>
      </div>
      
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
