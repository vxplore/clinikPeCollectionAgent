// import React from 'react';
import type { AssignmentActivitiesData } from "../../../../apis/modules/assignment/assignment.types";
import ActivitiesTabSkeleton from "./ActivitiesTabSkeleton";

interface ActivitiesTabProps {
  activities?: AssignmentActivitiesData["activities"];
  isLoading: boolean;
  error: Error | null;
}

const ActivitiesTab = ({
  activities,
  isLoading,
  error,
}: ActivitiesTabProps) => {
  console.log("ActivitiesTab props - activities:", activities);
  if (error) {
    return <div className="text-red-500">Error: {error.message}</div>;
  }

  if (isLoading) {
    return <ActivitiesTabSkeleton />;
  }

  const hasActivities = activities && activities.length > 0;

  return (
    <div className="relative py-4">
      {/* Timeline line */}
      {hasActivities && (
        <div className="absolute left-[6px] top-0 bottom-0 w-[2px] bg-gray-200" />
      )}

      {/* Activities */}
      <div className="space-y-4">
        {(activities || []).map((activity) => (
          <div key={activity.id} className="relative flex gap-4">
            {/* Timeline dot */}
            <div className="relative z-10 flex-shrink-0">
              <div
                className="w-[14px] h-[14px] rounded-full"
                style={{
                  backgroundColor:
                    activity.type === "sample_collected"
                      ? "#3B82F6"
                      : "#10B981",
                }}
              />
            </div>

            {/* Activity card */}
            <div className="flex-1 bg-white rounded-lg shadow-sm border border-[#E5E7EB] p-4 -mt-1">
              <h3 className="font-semibold text-gray-900 mb-1">
                {activity.user?.name || "Unknown User"}
              </h3>
              <p className="text-gray-700 text-sm mb-2">
                {activity.description}
              </p>
              <p className="text-gray-400 text-xs">{activity.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivitiesTab;
