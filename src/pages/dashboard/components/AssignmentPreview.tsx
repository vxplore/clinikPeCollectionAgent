import SectionHeader from "./SectionHeader";
import AssignmentCard from "./AssignmentCard";
import { useNavigate } from "react-router-dom";
import type { AssignmentsResponse } from "../../../apis/modules/assignment/assignment.types";
import type { ApiError } from "../../../apis/client/ApiError";
import AssignmentCardSkeleton from "./AssignmentCardSkeleton";
interface AssignmentPreviewProps {
  assignments?: AssignmentsResponse["assignments"];
  isLoading?: boolean;
  error?: ApiError | null;
  history?: boolean;
}

export default function AssignmentPreview({
  assignments,
  isLoading,
  error,
  history,
}: AssignmentPreviewProps) {
  const navigate = useNavigate();

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
    <div className="bg-white rounded-lg p-0  space-y-3">
      {!history && (
        <SectionHeader
          title="Assignments"
          actionLabel="See All"
          onActionClick={() => navigate("/assignments")}
        />
      )}

      {isLoading ? (
        <>
          <AssignmentCardSkeleton />
          <AssignmentCardSkeleton />
          <AssignmentCardSkeleton />
        </>
      ) : assignments && assignments.length > 0 ? (
        assignments.map((assignment) => (
          <AssignmentCard
            key={assignment.id}
            name={assignment.for_patient.name}
            id={assignment.id}
            time={assignment.schedule.start_date}
            completedSamples={assignment.sample_statistics.collected}
            totalSamples={assignment.sample_statistics.total}
            status={assignment.status}
          />
        ))
      ) : (
        <div className="p-4 text-gray-500">No assignments found</div>
      )}
    </div>
  );
}
