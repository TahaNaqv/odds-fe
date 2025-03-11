
import { Filter, Zap } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

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
            <SelectValue placeholder="Filter by type">
              {filterType === "all" ? (
                "All Purchases"
              ) : filterType === "auto" ? (
                <div className="flex items-center gap-1">
                  <Zap className="h-3 w-3 text-emerald-600" />
                  <span>Auto-enrolled</span>
                </div>
              ) : (
                <span>Manual only</span>
              )}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Purchases</SelectItem>
            <SelectItem value="auto">
              <div className="flex items-center gap-1">
                <Zap className="h-3 w-3 text-emerald-600" />
                <span>Auto-enrolled only</span>
                <Badge className="ml-1 bg-emerald-50 text-emerald-700 text-xs border-none">Auto</Badge>
              </div>
            </SelectItem>
            <SelectItem value="manual">
              <div className="flex items-center gap-1">
                <span>Manual only</span>
                <Badge className="ml-1 bg-indigo-50 text-indigo-700 text-xs border-none">Manual</Badge>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default FilterBar;
