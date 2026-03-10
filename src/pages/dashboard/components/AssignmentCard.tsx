import { Clock, FlaskConical, Phone } from "lucide-react";
import clsx from "clsx";
import Badge from "../../../shared/ui/Badge";
import { useNavigate } from "react-router-dom";

interface AssignmentCardProps {
  name: string;
  id: string;
  time: string;
  completedSamples: number;
  totalSamples: number;
  status: string;
}

export default function AssignmentCard({
  name,
  id,
  time,
  completedSamples,
  totalSamples,
  status,
}: AssignmentCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/assignments/${id}`);
  };

  const progress =
    totalSamples === 0 ? 0 : (completedSamples / totalSamples) * 100;

  const handleCall = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    console.log(`Initiating call for assignment ${id}`);
  };

  return (
    <div
      className="bg-white rounded-lg shadow-sm border p-3 space-y-2 cursor-pointer"
      onClick={handleClick}
    >
      {/* Top row */}
      <div className="flex justify-between items-start">
        <div>
          <p className="text-base font-semibold text-gray-900">{name}</p>
          <p className="text-xs text-[#828A94]">ID: {id}</p>
        </div>

        <div className="flex items-center gap-2">
          <Badge
            color={status === "pending" ? "orange" : "green"}
            variant="light"
            size="xs"
          >
            {status === "pending" ? "Pending" : "Completed"}
          </Badge>
          <div
            onClick={handleCall}
            className="bg-primary p-2 hover:opacity-80 rounded-full transition-opacity cursor-pointer"
          >
            <Phone size={16} className="text-white" />
          </div>
        </div>
      </div>

      {/* Meta row */}
      <div className="flex items-center gap-4 text-xs text-[#828A94]">
        <div className="flex items-center gap-1">
          <Clock size={14} />
          <span>{time}</span>
        </div>

        <div className="flex items-center gap-1">
          <FlaskConical size={14} />
          <span>
            {completedSamples} of {totalSamples} Samples
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className={clsx(
            "h-full rounded-full transition-all duration-500",
            progress === 100 ? "bg-primary" : "bg-muted",
          )}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
