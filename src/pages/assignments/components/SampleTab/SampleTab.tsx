import SampleStatCard from "./SampleStatCard";
import SampleCard from "./SampleCard";
import SampleTabSkeleton from "./SampleTabSkeleton";
import { type AssignmentSamplesData } from "../../../../apis/modules/assignment/assignment.types";

interface SampleTabProps {
  handleMarkCollected?: () => Promise<void>;
  samples?: AssignmentSamplesData;
  isLoading?: boolean;
  error?: Error | null;
}

const SampleTab = ({
  handleMarkCollected = async () => {},
  samples,
  isLoading = false,
  error = null,
}: SampleTabProps) => {
  // Show skeleton if loading
  if (isLoading) {
    return <SampleTabSkeleton />;
  }

  // Show error if error occurred
  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        Error loading samples: {error.message}
      </div>
    );
  }

  // Show empty state if no data
  if (!samples) {
    return (
      <div className="text-center py-8 text-gray-500">No samples available</div>
    );
  }

  const stats = [
    {
      label: "Total",
      value: samples.sample_statistics.total.toString(),
      type: "total" as const,
    },
    {
      label: "Collected",
      value: samples.sample_statistics.collected.toString(),
      type: "collected" as const,
    },
    {
      label: "Pending",
      value: samples.sample_statistics.pending.toString(),
      type: "pending" as const,
    },
  ];

  // const samples: Sample[] = [
  //   {
  //     id: "1",
  //     title: "Sample - 001",
  //     subtitle: "Blood Test",
  //     statusText: "Collected",
  //     note: "Sample collected on 15 Jan 2024 at 09:30 AM",
  //   },
  //   {
  //     id: "2",
  //     title: "Sample - 002",
  //     subtitle: "Urine Test",
  //     statusText: "Pending",
  //     note: "Awaiting collection from patient",
  //   },
  // ];

  return (
    <div className="space-y-4">
      <SampleStatCard stats={stats} />
      {samples.samples.map((sample) => (
        <SampleCard
          handleMarkCollected={handleMarkCollected}
          key={sample.id}
          title={`Sample - ${sample.id}`}
          subtitle={sample.name}
          statusText={sample.status === "collected" ? "Collected" : "Pending"}
          note={sample.notes || sample.description || "No notes"}
        />
      ))}
    </div>
  );
};

export default SampleTab;
