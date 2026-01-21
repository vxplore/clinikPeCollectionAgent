import { useState } from "react";
import FilterChips from "./components/FilterChips";
import { AssignmentPageCard } from "./components/AssignmentPageCard";
import SecondaryHeader from "../../layouts/AppShell/SecondaryHeader";
import { useAssignments } from "./hooks/useAssignment";
import { useAssignmentFilters } from "./hooks/useAssignmentFilters";
const AssignmentPage = () => {
  const [activeTab, setActiveTab] = useState("today");
  const { assignments, isLoading, error } = useAssignments({ day: activeTab });
  const {
    filters,
    isLoading: filtersLoading,
    error: filtersError,
  } = useAssignmentFilters();
  console.log("Assignments:", assignments);

  const categoryFilters = [
    { label: "Today", value: "today" },
    { label: "Yesterday", value: "yesterday" },
    { label: "Tomorrow", value: "tomorrow" },
    { label: "Old", value: "old" },
    { label: "new", value: "new" },
  ];
  console.log("Assignments data:", error);

  const handleCategoryChange = (value: string) => setActiveTab(value);

  return (
    <div>
      <div className="fixed top-15 left-0 right-0 z-40 bg-white/70 backdrop-blur-md ">
        <SecondaryHeader>
          <h2 className="text-lg font-semibold text-gray-900">
            <FilterChips
              isLoading={filtersLoading}
              isError={!!filtersError}
              filters={filters ? categoryFilters : []}
              activeTab={activeTab}
              onCategoryChange={handleCategoryChange}
            />
          </h2>
        </SecondaryHeader>
      </div>
      <div>
        <div className="h-16" />
      </div>
      <div className="flex flex-col gap-4">
        {isLoading ? (
          <>
            <AssignmentPageCard
              loading
              id=""
              name=""
              gender={null}
              age={null}
              address=""
              latitude={0}
              longitude={0}
              collectedCount={0}
              totalCount={0}
              testsCount={0}
              samples={[]}
            />
            <AssignmentPageCard
              age={0}
              loading
              id=""
              name=""
              gender={null}
              address=""
              latitude={0}
              longitude={0}
              collectedCount={0}
              totalCount={0}
              testsCount={0}
              samples={[]}
            />
            <AssignmentPageCard
              loading
              id=""
              name=""
              age={null}
              address=""
              latitude={0}
              longitude={0}
              collectedCount={0}
              totalCount={0}
              testsCount={0}
              samples={[]}
            />
          </>
        ) : assignments && assignments.length > 0 ? (
          assignments.map((assignment) => (
            <AssignmentPageCard
              gender={assignment.for_patient.gender}
              key={assignment.id}
              id={assignment.id}
              name={assignment.for_patient.name}
              age={assignment.for_patient.age}
              address={assignment.location.address}
              latitude={assignment.location.lat}
              longitude={assignment.location.lng}
              collectedCount={assignment.sample_statistics.collected}
              totalCount={assignment.sample_statistics.total}
              testsCount={assignment.count_test}
              samples={assignment.samples.map((s) => s.name)}
            />
          ))
        ) : (
          <div className="p-4 text-gray-500">No assignments found</div>
        )}
      </div>
    </div>
  );
};

export default AssignmentPage;
