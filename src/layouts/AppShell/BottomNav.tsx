import { NavLink } from "react-router-dom";
import { LayoutDashboard, ClipboardList, User, Settings } from "lucide-react";
import clsx from "clsx";
import { useAuthStore } from "../../stores/auth.store";

const tabs = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/assignments", label: "Assignments", icon: ClipboardList },
  { to: "/profile", label: "Profile", icon: User },
  { to: "/settings", label: "Settings", icon: Settings },
];

export default function BottomNav() {
  const profileImage = useAuthStore((s) => s.user?.profile_image);

  return (
    <nav className="app-bottom-nav safe-bottom border-t bg-white">
      <ul className="flex">
        {tabs.map(({ to, label, icon: Icon }) => (
          <li key={to} className="flex-1">
            <NavLink
              to={to}
              className={({ isActive }) =>
                clsx(
                  "flex flex-col items-center gap-1 py-2 text-xs transition-colors",
                  isActive ? "text-[#0D52AF]" : "text-gray-400",
                )
              }
            >
              {to === "/profile" ? (
                <img
                  src={
                    profileImage ??
                    "https://multilangbridge.in/uploads/website-images/frontend-avatar.png"
                  }
                  alt="profile"
                  className="w-6 h-6 rounded-full object-cover" 
                />
              ) : (
                <Icon size={20} />
              )}
              <span>{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
