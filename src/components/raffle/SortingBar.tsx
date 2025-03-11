
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp } from "lucide-react";

type SortField = "date" | "tickets" | "amount";
type SortDirection = "asc" | "desc";

interface SortingBarProps {
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
}

const SortingBar = ({ sortField, sortDirection, onSort }: SortingBarProps) => {
  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? 
      <ArrowUp className="h-3 w-3 ml-1" /> : 
      <ArrowDown className="h-3 w-3 ml-1" />;
  };
  
  return (
    <div className="flex justify-between items-center px-4 py-2 bg-muted rounded-md text-sm font-medium">
      <div className="w-1/2">
        <Button 
          variant="ghost" 
          onClick={() => onSort("date")}
          className="text-xs h-6 px-2 flex items-center"
        >
          Date
          <SortIcon field="date" />
        </Button>
      </div>
      <div className="w-1/2 text-right flex justify-end gap-2">
        <Button 
          variant="ghost" 
          onClick={() => onSort("tickets")}
          className="text-xs h-6 px-2 flex items-center"
        >
          Tickets
          <SortIcon field="tickets" />
        </Button>
        <Button 
          variant="ghost" 
          onClick={() => onSort("amount")}
          className="text-xs h-6 px-2 flex items-center"
        >
          Amount
          <SortIcon field="amount" />
        </Button>
      </div>
    </div>
  );
};

export default SortingBar;
