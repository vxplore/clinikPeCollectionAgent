import React from "react";

interface PopoverNotificationCardProps {
  notification: {
    title: string;
    message: string;
    time: string;
    progress: number;
  };
}

const PopoverNotificationCard: React.FC<PopoverNotificationCardProps> = ({
  notification,
}) => {
  return (
    <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0">
      <div className="flex justify-between items-start gap-2">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900">
            {notification.title}
          </p>
          <p className="text-xs text-gray-600 mt-0.5">{notification.message}</p>
        </div>
        <span className="text-xs text-gray-400 whitespace-nowrap">
          {notification.time}
        </span>
      </div>
    </div>
  );
};

export default PopoverNotificationCard;
