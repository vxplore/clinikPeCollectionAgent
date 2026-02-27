import React, { useState } from "react";
import Badge from "../../../../shared/ui/Badge";
import { Ban, AlertCircle, Trash } from "lucide-react";
import { Button } from "@mantine/core";
import DangerModal from "../../../../layouts/AppShell/DangerModal";
import { useDeleteSamples } from "../../hooks/useDeleteTest";

interface SampleCardProps {
  title: string;
  subtitle: string;
  statusText: string;
  note: string;
  id: string;
  booking_id: string;
  handleMarkCollected: (id: string, booking_id: string) => void;
  handleDeleteSample?: (id: string, booking_id: string) => Promise<void>;
  isMarkingCollected?: boolean;
  isDeletingSample?: boolean;
}

const SampleCard: React.FC<SampleCardProps> = ({
  title,
  subtitle,
  statusText,
  note,
  id,
  booking_id,
  handleMarkCollected,
  handleDeleteSample,
  isMarkingCollected = false,
  isDeletingSample = false,
}) => {
  console.log("booking id in SampleCard:", booking_id);
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);

  const onConfirmDelete = async () => {
    // useDeleteSamples(booking_id);
  };
  const getBadgeColor = (status: string): "green" | "orange" => {
    return status.toLowerCase() === "collected" ? "green" : "orange";
  };

  const isPending = statusText.toLowerCase() === "pending";

  return (
    <div className="w-full">
      <div className="w-full rounded-xl border border-[#E5E7EB] bg-white p-4">
        {/* Top row */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500">{subtitle}</p>
          </div>

          <Badge color={getBadgeColor(statusText)} size="xs">
            {statusText}
          </Badge>
        </div>

        {/* Note box */}
        {/* <div className="mt-3 rounded-lg bg-blue-50 px-4 py-3">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Note:</span> {note}
          </p>
        </div> */}
      </div>

      {/* Action buttons for pending status */}
      {isPending && (
        <div className="mt-3 flex gap-3 items-center">
          <Button
            onClick={() => handleMarkCollected(id, booking_id)}
            fullWidth
            color="#09986A"
            size="md"
            loading={isMarkingCollected}
            disabled={isMarkingCollected}
          >
            Mark Collected
          </Button>
          <button
            onClick={() => setDeleteModalOpened(true)}
            className="p-3.5 bg-red-100 rounded-xl hover:bg-red-200 transition"
            disabled={isDeletingSample}
            aria-label="Delete sample"
          >
            <Trash className="text-red-600" size={20} />
          </button>
        </div>
      )}

      <DangerModal
        opened={deleteModalOpened}
        onClose={() => setDeleteModalOpened(false)}
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-center text-gray-900">
              Delete Sample?
            </h3>
            <p className="text-sm text-center text-gray-600">
              Are you sure you want to delete{" "}
              <span className="font-semibold">{title}</span>? This action cannot
              be undone.
            </p>
          </div>
          <div className="flex-col gap-3">
            <Button
              color="red"
              onClick={onConfirmDelete}
              loading={isDeletingSample}
              disabled={isDeletingSample}
              fullWidth
            >
              Delete
            </Button>
            <Button
              variant="subtle"
              onClick={() => setDeleteModalOpened(false)}
              fullWidth
            >
              Cancel
            </Button>
          </div>
        </div>
      </DangerModal>
    </div>
  );
};

export default SampleCard;
