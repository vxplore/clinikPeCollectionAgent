import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import Badge from "../../../../shared/ui/Badge";
import DangerModal from "../../../../layouts/AppShell/DangerModal";
import DeleteConfirmModalContent from "./DeleteConfirmModalContent";

interface TestCardProps {
  title: string;
  description: string;
  status: string;
  onDelete?: () => void;
  is_deletable?: boolean;
}

const TestCard: React.FC<TestCardProps> = ({
  title,
  description,
  status,
  onDelete,
  is_deletable = false,
}) => {
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleDeleteClick = () => {
    setDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    onDelete?.();
    setDeleteOpen(false);
  };

  console.log("Rendering TestCard:", { title, status, onDelete, is_deletable });
  // const isCompleted = status === "Completed";

  const getBadgeColor = (status: string): "green" | "gray" => {
    return status === "Completed" || status === "Active" ? "green" : "gray";
  };

  console.log("TestCard Props:", is_deletable);
  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>

        <div className="flex items-center gap-2">
          <Badge color={getBadgeColor(status)} size="xs">
            {status}
          </Badge>

          {is_deletable && (
            <div
              className="cursor-pointer hover:bg-red-100 rounded-full p-2"
              onClick={handleDeleteClick}
            >
              <Trash2 size={16} className="text-red-400 hover:text-red-500" />
            </div>
          )}
        </div>
      </div>

      {/* Description box */}
      <div className="mt-3 rounded-lg bg-blue-50 px-4 py-3">
        <p className="text-sm text-gray-700">{description}</p>
      </div>

      <DangerModal opened={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <DeleteConfirmModalContent
          onConfirm={handleConfirmDelete}
          onClose={() => setDeleteOpen(false)}
          testName={title}
        />
      </DangerModal>
    </div>
  );
};

export default TestCard;
