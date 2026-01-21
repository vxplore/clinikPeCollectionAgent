// import React from "react";
import StatCard from "./components/StatCard";
import building from "../../assets/building.svg";
import lab from "../../assets/lab.svg";
import payment from "../../assets/payments.svg";
import AppointmentPreview from "./components/AssignmentPreview";
import { useStatistics } from "./hooks/useDashboard";
import { useAssignments } from "../assignments/hooks/useAssignment";
const DashboardPage = () => {
  const { statistics, isLoading, error } = useStatistics();
  const {
    assignments,
    isLoading: assignmentsLoading,
    error: assignmentsError,
  } = useAssignments( { pageSize: 3 , pageNumber: 1 } );
  console.log("Assignments:", assignments);
  if (error)
    return <div className="p-4 text-red-600">Error: {error.message}</div>;

  //special mock+ dynamic data for stat cards
  const statCardsData = [
    {
      id: 1,
      label: "Today's Tasks",
      value: statistics ? statistics.today_task.toString() : undefined,
      color: "#0D52AF",
      icon: <img src={building} alt="Tasks" className="w-6 h-6" />,
    },
    {
      id: 2,
      label: "Pending Samples",
      value: statistics ? statistics.pending_sample.toString() : undefined,
      color: "#09986A",
      icon: <img src={lab} alt="Samples" className="w-6 h-6" />,
    },
    {
      id: 3,
      label: "Due Payments",
      value: statistics ? `₹${statistics.due_payment.amount}` : undefined,
      color: "#D58700",
      icon: <img src={payment} alt="Payments" className="w-6 h-6" />,
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-3  gap-4">
        {statCardsData.map((card) => (
          <StatCard
            key={card.id}
            label={card.label}
            value={card.value}
            color={card.color}
            icon={card.icon}
            isLoading={isLoading}
          />
        ))}
      </div>
      <AppointmentPreview
        assignments={assignments}
        isLoading={assignmentsLoading}
        error={assignmentsError}
      />
    </div>
  );
};

export default DashboardPage;
