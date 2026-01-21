import FilterChipsSkeleton from "./FilterChipsSkeleton";

interface CategoryFilter {
  label: string;
  value: string;
}

interface FilterChipsProps {
  filters: CategoryFilter[];
  activeTab: string;
  onCategoryChange: (value: string) => void;
  isLoading: boolean;
  isError: boolean;
}

export default function FilterChips({
  isLoading,
  isError,
  filters,
  activeTab,
  onCategoryChange,
}: FilterChipsProps) {
  if (isLoading) {
    return <FilterChipsSkeleton />;
  }
  if (isError) {
    return <p className="text-red-500">Error loading filters</p>;
  }
  return (
    <div className="px-2 pt-0 pb-0">
      <div className="flex gap-2 overflow-x-auto  no-scrollbar  pb-2 scrollbar-hide">
        {filters.map((filter) => (
          <div
            key={filter.value}
            onClick={() => onCategoryChange(filter.value)}
            className={`whitespace-nowrap px-4 py-2 rounded-full  font-medium text-sm transition-all ${
              activeTab === filter.value
                ? "bg-[#1E40AF] text-white"
                : "bg-[#F3F4F6] text-[#4B5563] "
            }`}
          >
            {filter.label}
          </div>
        ))}
      </div>
    </div>
  );
}
