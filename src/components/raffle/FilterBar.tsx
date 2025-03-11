
import { Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

type FilterOption = "all" | "auto" | "manual";

interface FilterBarProps {
  filterType: FilterOption;
  searchTerm: string;
  onFilterChange: (value: FilterOption) => void;
  onSearchChange: (value: string) => void;
}

const FilterBar = ({ filterType, searchTerm, onFilterChange, onSearchChange }: FilterBarProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-4">
      <div className="flex-1">
        <Input
          placeholder="Search by raffle ID or token"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full"
        />
      </div>
      <div className="flex gap-2 items-center">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <Select 
          value={filterType} 
          onValueChange={(value: FilterOption) => onFilterChange(value)}
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
  );
};

export default FilterBar;
