import React, { useState } from "react";
import { Popover, Button, Badge } from "@mantine/core";
import { Bell } from "lucide-react";
import PopoverNotificationCard from "./PopoverNotificationCard";
import { useUIStore } from "../../stores/ui.store";

interface NotificationBellProps {
  notifications?: Array<{
    title: string;
    message: string;
    time: string;
    progress: number;
  }>;
}

//mock data - empty for now
const mockNotification = [];

const NotificationBell: React.FC<NotificationBellProps> = ({
  notifications = [],
}) => {
  const [opened, setOpened] = useState(false);
  const notificationCount = useUIStore((state) => state.notificationCount);
  console.log(
    "NotificationBell - notificationCount from store:",
    notificationCount,
  );

  return (
    <Popover
      position="bottom-end"
      withArrow
      shadow="md"
      opened={opened}
      onChange={setOpened}
    >
      <Popover.Target>
        <Button
          variant="subtle"
          onClick={() => setOpened((o) => !o)}
          className="relative p-2"
          aria-label="Notifications"
        >
          <Bell size={20} className="text-gray-700" />
          {notificationCount > 0 && (
            <Badge
              size="xs"
              className="absolute top-0 right-0 rounded-full"
              variant="filled"
              color="red"
            >
              {notificationCount > 99 ? "99+" : notificationCount}
            </Badge>
          )}
        </Button>
      </Popover.Target>
      <Popover.Dropdown className="w-80 max-h-96 overflow-y-auto">
        <div className="p-0">
          <div className="space-y-0">
            {mockNotification.length > 0 ? (
              mockNotification.map((notification, index) => (
                <PopoverNotificationCard
                  key={index}
                  notification={notification}
                />
              ))
            ) : (
              <div className="text-sm text-gray-500 text-center py-8">
                No new notifications
              </div>
            )}
          </div>
        </div>
      </Popover.Dropdown>
    </Popover>
  );
};

export default NotificationBell;
