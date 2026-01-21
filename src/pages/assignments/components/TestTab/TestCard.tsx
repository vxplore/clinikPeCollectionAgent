import React from "react";
// import { Trash2 } from "lucide-react";
// import Badge from "../../../../shared/ui/Badge";

interface TestCardProps {
  title: string;
  description: string;
  status: "Active" | "Completed";
  onDelete?: () => void;
}

const TestCard: React.FC<TestCardProps> = ({
  title,
  description,
  status,
  onDelete,
}) => {
  console.log("Rendering TestCard:", { title, status , onDelete});
  // const isCompleted = status === "Completed";

  // const getBadgeColor = (status: string): "green" | "gray" => {
  //   return status === "Active" ? "green" : "gray";
  // };

  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>

        {/* <div className="flex items-center gap-2">
          <Badge color={getBadgeColor(status)} size="xs">
            {status}
          </Badge>

          {isCompleted && onDelete && (
            <div className="cursor-pointer  hover:bg-red-100 rounded-full p-2">
              <Trash2 size={16} className="text-red-400 hover:text-red-500" />
            </div>
          )}
        </div> */}
      </div>

      {/* Description box */}
      <div className="mt-3 rounded-lg bg-blue-50 px-4 py-3">
        <p className="text-sm text-gray-700">{description}</p>
      </div>
    </div>
  );
};

export default TestCard;
