import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import PaymentModal from "./PaymentModal";
import AllTabs from "./AllTabs";
import { notify } from "../../../app/notifications";
import { useUIStore } from "../../../stores/ui.store";

const AssignmentTabs = () => {
  const [activeTab, setActiveTab] = useState<string | null>("Sample");
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const navigate = useNavigate();
  // UI Store
  const showLoader = useUIStore((s) => s.showLoader);
  const hideLoader = useUIStore((s) => s.hideLoader);

  const handleMarkCollected = async () => {
    showLoader();
    setTimeout(() => {
      hideLoader();
      notify.success("Samples marked as collected successfully!");
    }, 1000);
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
