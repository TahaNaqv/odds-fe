
import FilterBar from "./FilterBar";

type FilterOption = "all" | "auto" | "manual";

interface ListHeaderProps {
  filterType: FilterOption;
  searchTerm: string;
  onFilterChange: (value: FilterOption) => void;
  onSearchChange: (value: string) => void;
}

const ListHeader = ({ filterType, searchTerm, onFilterChange, onSearchChange }: ListHeaderProps) => {
  return (
    <div className="mb-4">
      <FilterBar 
        filterType={filterType}
        searchTerm={searchTerm}
        onFilterChange={onFilterChange}
        onSearchChange={onSearchChange}
      />
    </div>
  );
};

export default ListHeader;
