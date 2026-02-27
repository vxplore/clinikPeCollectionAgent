import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Plus } from "lucide-react";
import PaymentModal from "./PaymentModal";
import AllTabs from "./AllTabs";
import { notify } from "../../../app/notifications";
import { useMarkSampleCollected } from "../hooks/useTabData";

const AssignmentTabs = () => {
  const [activeTab, setActiveTab] = useState<string | null>("Sample");
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [markParams, setMarkParams] = useState<{
    bookingId: string;
    sampleId: string;
  } | null>(null);

  const navigate = useNavigate();
  const { id: assignmentId } = useParams<{ id: string }>();
  // UI Store
  // const showLoader = useUIStore((s) => s.showLoader);
  // const hideLoader = useUIStore((s) => s.hideLoader);

  // Call hook at component level (only when params are set)
  const { mutate: markCollected, isPending } = useMarkSampleCollected(
    markParams?.bookingId || "",
    markParams?.sampleId || "",
    assignmentId!,
    assignmentId!,
  );

  // Trigger mutation when params change
  useEffect(() => {
    if (!markParams) return;

    markCollected(undefined, {
      onSuccess: () => {
        notify.success("Sample marked as collected successfully!");
        setMarkParams(null);
      },
      onError: (error) => {
        notify.error(error?.message || "Failed to mark sample as collected");
        console.error("Error marking sample:", error);
        setMarkParams(null);
      },
    });
  }, [markParams, markCollected]);

  const handleMarkCollected = async (sampleId: string, bookingId: string) => {
    console.log(
      "Mark Collected - Sample ID:",
      sampleId,
      "Booking ID:",
      bookingId,
      "Assignment ID:",
      assignmentId,
    );
    console.log("Setting markParams with:", { bookingId, sampleId  });

    // Just set the params - the hook will be triggered via useEffect
    setMarkParams({ bookingId, sampleId });
  };

  const handleAddClick = () => {
    if (activeTab === "Tests") {
      navigate("add-test");
    } else if (activeTab === "Payments") {
      setPaymentModalOpen(true);
    }
  };

  return (
    <div className="relative">
      <AllTabs
        handleMarkCollected={handleMarkCollected}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMarkingCollected={isPending}
      />

      {(activeTab === "Tests" || activeTab === "Payments") && (
        <button
          onClick={handleAddClick}
          aria-label="Add"
          className="
    fixed bottom-20 right-6
    w-14 h-14 rounded-full
    bg-primary text-white
    flex items-center justify-center
    shadow-lg
    transition
    duration-150
    ease-out
    active:scale-90
    active:shadow-md
    focus:outline-none
    touch-manipulation
  "
        >
          <Plus size={24} />
        </button>
      )}

      {paymentModalOpen && (
        <PaymentModal onClose={() => setPaymentModalOpen(false)} />
      )}
    </div>
  );
};

export default AssignmentTabs;
