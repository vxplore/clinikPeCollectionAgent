import React from "react";
import { useNavigate } from "react-router-dom";
import leftarrow from "../.././assets/leftarrow.svg";
import NotificationBell from "./NotificationBell";
import { useLocation } from "react-router-dom";
interface BackHeaderProps {
  title: string;
  onBack?: () => void;
}

const BackHeader: React.FC<BackHeaderProps> = ({ title, onBack }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  if(location.pathname === '/notifications'){
  console.log("In notifications page - BackHeader rendered");
  
  }

  return (
    <div className="flex px-4 py-2 items-center justify-between gap-2 bg-white">
      <div className="flex items-center gap-2">
        <button type="button" onClick={handleBack} className="p-2">
          <img src={leftarrow} className="h-6 w-6" alt="Back" />
        </button>
        <h1 className="ml-2 text-xl font-semibold text-gray-900">{title}</h1>
      </div>

      {location.pathname !== '/notifications' && (
        <NotificationBell notificationCount={58} />
      )}
    </div>
  );
};

export default BackHeader;
