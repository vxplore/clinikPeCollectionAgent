import React from "react";
import { useNavigate } from "react-router-dom";
import leftarrow from "../.././assets/leftarrow.svg";

interface BackHeaderProps {
  title: string;
  onBack?: () => void;
}

const BackHeader: React.FC<BackHeaderProps> = ({ title, onBack }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="flex px-4 py-2 items-center gap-2 bg-white">
      <button type="button" onClick={handleBack} className="p-2">
        <img src={leftarrow} className="h-4 w-4" alt="Back" />
      </button>

      <h1 className="ml-2 text-xl font-semibold text-gray-900">{title}</h1>
    </div>
  );
};

export default BackHeader;
