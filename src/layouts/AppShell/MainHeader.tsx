import threeline from "../../assets/threeline.svg";
import { Button } from "@mantine/core";
import NotificationBell from "./NotificationBell";

const MainHeader = ({
  title,
  onMenuClick,
}: {
  title: string | undefined;
  onMenuClick?: () => void;
}) => {
  return (
    <div>
      {/* Left: Menu + Greeting */}
      <div className="flex justify-between items-center px-4 py-2">
        <div className="flex items-center gap-3">
          <Button variant="subtle" onClick={onMenuClick} className="p-0">
            <img className="p-3" src={threeline} alt="Menu" />
          </Button>

          <div className="leading-tight">
            <p className="text font-semibold text-xl text-gray-900">{title}</p>
            {/* <p className="text-xs text-gray-500">Welcome back, Ajij</p> */}
          </div>
        </div>

        {/* Right: Notification Bell */}
        <NotificationBell notificationCount={70} />
      </div>
    </div>
  );
};

export default MainHeader;
