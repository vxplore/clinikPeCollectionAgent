// import React from 'react'

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { Modal } from "@mantine/core";
import { type Activity } from "./ActivitiesTab/ActivitesTab";
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
  // const setError = useUIStore((s) => s.setError);

  const handleMarkCollected = async () => {
    // setError("Marking samples as collected...");
    showLoader();
    setTimeout(() => {
      hideLoader();
      notify.success("Samples marked as collected successfully!");
    }, 1000);
    // 5 seconds
  };

  const activities: Activity[] = [
    {
      id: "1",
      name: "Balaram Das",
      action: "collected Urine for Urine test today at 9 AM",
      timestamp: "2 hours ago",
      color: "#10b981",
    },
    {
      id: "2",
      name: "Rakesh Sharma",
      action: "collected Blood for Sugar test yesterday at 10 AM",
      timestamp: "1 day ago",
      color: "#3b82f6",
    },
    {
      id: "3",
      name: "Sanjiv Verma",
      action: "added a new test 'Blood Sugar Test' yesterday",
      timestamp: "1 day ago",
      color: "#f97316",
    },
    {
      id: "4",
      name: "Dr. Priya Singh",
      action: "reviewed and approved the test requirements :",
      timestamp: "2 days ago",
      color: "#a855f7",
    },
    {
      id: "4",
      name: "Dr. Priya Singh",
      action: "reviewed and approved the test requirements :",
      timestamp: "2 days ago",
      color: "#000000",
    },
  ];

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
        activities={activities}
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

      <Modal
        opened={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        title={<span className="text-lg font-semibold">New Payment</span>}
        size="md"
        centered
      >
        <PaymentModal onClose={() => setPaymentModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default AssignmentTabs;
