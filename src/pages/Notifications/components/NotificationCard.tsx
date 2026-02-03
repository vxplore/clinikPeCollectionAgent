import React from "react";
import { ClipboardList } from "lucide-react";

interface NotificationCardProps {
  notification: {
    title: string;
    message: string;
    time: string;
    progress: number;
  };
}

const NotificationCard = ({ notification }: NotificationCardProps) => {
  return (
    <div className="w-full max-w-md rounded-xl bg-white shadow-md p-4 flex gap-3 items-start">
      {/* Icon */}
      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-500 text-white">
        <ClipboardList size={20} />
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-gray-900">{notification.title}</h4>
          <span className="text-xs text-gray-400">{notification.time}</span>
        </div>

        <p className="text-sm text-gray-600 mt-1">{notification.message}</p>

        {/* Progress Bar */}
      </div>
    </div>
  );
};

export default NotificationCard;
