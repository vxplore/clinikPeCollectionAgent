import { Clock, FlaskConical, Phone, Loader2 } from "lucide-react";
import clsx from "clsx";
import Badge from "../../../shared/ui/Badge";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getMaskingNumber } from "../../../apis/modules/dashboard/dashboard.api";
import DangerModal from "../../../layouts/AppShell/DangerModal";
import MaskingNumberModal from "./MaskingNumberModal";

interface AssignmentCardProps {
  name: string;
  id: string;
  time: string;
  completedSamples: number;
  totalSamples: number;
  status: string;
  bookingId: string;
}

export default function AssignmentCard({
  name,
  id,
  time,
  completedSamples,
  totalSamples,
  status,
  bookingId,
}: AssignmentCardProps) {
  const navigate = useNavigate();

  const [isCalling, setIsCalling] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [maskingNumber, setMaskingNumber] = useState<string | null>(null);

  const handleClick = () => {
    // Best Practice: Prevent navigation if a modal is active
    if (isModalOpen) return;
    navigate(`/assignments/${id}`);
  };

  const progress =
    totalSamples === 0 ? 0 : (completedSamples / totalSamples) * 100;

  const handleCall = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); // Stops the card click from firing when clicking the button

    if (isCalling) return;

    setIsCalling(true);
    try {
      const response = await getMaskingNumber(bookingId);
      const number = response?.data?.virtual_number;

      if (number) {
        setMaskingNumber(number);
        setIsModalOpen(true);
      } else {
        console.error("No masking number found");
      }
    } catch (error) {
      console.error("Error fetching masking number:", error);
    } finally {
      setIsCalling(false);
    }
  };

  return (
    <div
      className="bg-white rounded-lg shadow-sm border p-3 space-y-2 cursor-pointer hover:border-primary/30 transition-colors"
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
            className={clsx(
              "p-2 rounded-full transition-all flex items-center justify-center min-w-[32px] min-h-[32px]",
              isCalling
                ? "bg-gray-100 cursor-wait"
                : "bg-primary hover:bg-primary/90 cursor-pointer active:scale-95",
            )}
          >
            {isCalling ? (
              <Loader2 size={16} className="text-primary animate-spin" />
            ) : (
              <Phone size={16} className="text-white" />
            )}
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
            progress === 100 ? "bg-primary" : "bg-primary/40",
          )}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* ROOT CAUSE FIX: 
          Wrapping the modal in a div that stops propagation. 
          This prevents clicks inside the modal from bubbling up to the Card's onClick.
      */}
      <div onClick={(e) => e.stopPropagation()}>
        <DangerModal
          opened={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          {maskingNumber && (
            <MaskingNumberModal
              number={maskingNumber}
              isLoading={isCalling}
              onClose={() => setIsModalOpen(false)}
            />
          )}
        </DangerModal>
      </div>
    </div>
  );
}