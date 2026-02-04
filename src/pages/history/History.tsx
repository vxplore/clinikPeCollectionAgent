import { useAssignments } from "../assignments/hooks/useAssignment";
import EmptyState from "../../shared/ui/EmptyState";
import AppointmentPreview from "../dashboard/components/AssignmentPreview";
import AssignmentCardSkeleton from "../dashboard/components/AssignmentCardSkeleton";

const History = () => {
  const { assignments = [], isLoading, error } = useAssignments({
    status: "collected",
  });

  if (error) {
    return (
      <div className="bg-white rounded-lg p-4">
        <p className="text-red-600">
          Error loading assignments: {error.message}
        </p>
      </div>
    );
  }

  return (
    <div>
      {isLoading ? (
        <div className="space-y-3">
          <AssignmentCardSkeleton />
          <AssignmentCardSkeleton />
          <AssignmentCardSkeleton />
          <AssignmentCardSkeleton />
          <AssignmentCardSkeleton />
        </div>
      ) : assignments.length > 0 ? (
        <AppointmentPreview
          history
          assignments={assignments}
        />
      ) : (
        <EmptyState
          title="No history yet"
          description="Completed assignments will appear here"
          compact
        />
      )}
    </div>
  );
};

export default History;
