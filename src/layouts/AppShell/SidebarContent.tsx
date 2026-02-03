import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, ClipboardList, User, LogOut } from "lucide-react";
import logo from "../../assets/clinikpe.svg";

interface SidebarContentProps {
  onClose: () => void;
  onLogoutClick: () => void;
}

const SidebarContent: React.FC<SidebarContentProps> = ({
  onClose,
  onLogoutClick,
}) => {
  const location = useLocation();

  const menuItems = [
    // { label: "Dashboard", path: "/dashboard", icon: Home },
    // { label: "Assignments", path: "/assignments", icon: ClipboardList },
    // { label: "Profile", path: "/profile", icon: User },
    { label: "Dashboard", path: "/dashboard", icon: Home },
    { label: "Assignments", path: "/assignments", icon: ClipboardList },
    // --- additional realistic items ---
    { label: "Profile", path: "/profile", icon: User },
    // { label: "Settings", path: "/settings", icon: Settings },
  ];

  return (
    <div className="flex flex-col h-full text-white rounded-tr-xl">
      {/* Header */}
      <div className="p-4 pb-2 bg-white rounded-tr-xl">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <img src={logo} alt="ClinikPe Logo" />
          </div>
          {/* <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 border border-gray-200"
          >
            <X size={20} />
          </button> */}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <li className="mt-4" key={item.path}>
                <Link
                  to={item.path}
                  onClick={onClose}
                  className={`w-full  flex items-center gap-4 px-4 py-2 rounded-xl transition-all duration-200 group block ${
                    isActive
                      ? "bg-white text-[#0D52AF] shadow-lg"
                      : "text-white/90 hover:bg-white/10 hover:translate-x-1"
                  }`}
                >
                  <Icon
                    size={22}
                    className={
                      isActive
                        ? "text-[#0D52AF]"
                        : "text-white/80 group-hover:text-white"
                    }
                  />
                  <span className="font-semibold text-[15px]">
                    {item.label}
                  </span>
                  {/* {isActive && (
                    <div className="ml-auto w-1.5 h-1.5 bg-[#0D52AF] rounded-full" />
                  )} */}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-2 border-t border-white/10 rounded-br-lg">
        <button
          onClick={onLogoutClick}
          className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-white/90 hover:bg-white/10 transition-all duration-200 group hover:translate-x-1"
        >
          <LogOut size={22} className="text-white/80 group-hover:text-white" />
          <span className="font-medium text-[15px]">Logout</span>
        </button>

        <div className="mt-2 px-4 py-3 bg-white/5 rounded-xl border border-white/10">
          <p className="text-xs text-white/60 mb-1">Need Help?</p>
          <p className="text-sm text-white/90">support@clinikpe.com</p>
        </div>
      </div>
    </div>
  );
};

export default SidebarContent;
