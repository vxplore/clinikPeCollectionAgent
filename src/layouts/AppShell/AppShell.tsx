import { Outlet, useLocation, matchPath } from "react-router-dom";
import Header from "./Header";
import BottomNav from "./BottomNav";
import { routeMeta } from "../../app/routeMeta";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import Sidebar from "./Sidebar";
import { useState } from "react";
import LogoutConfirmModal from "./LogoutConfirmModal";
import { useLogout } from "../../pages/auth/hooks/useLogout";
export default function AppShell() {



  const { logout, isLoading } = useLogout();

  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const meta = Object.entries(routeMeta).find(([path]) =>
    matchPath(path, location.pathname),
  )?.[1] ?? {
    header: "back",
    showBottomNav: true,
  };

  console.log("Route Meta:", meta);

  
  const [logoutOpen, setLogoutOpen] = useState(false);

  const handleLogoutClick = () => {
    setSidebarOpen(false);
    setLogoutOpen(true);
  };

  const handleConfirmLogout = () => {
    logout();
    setLogoutOpen(false);
  }
  return (
    <div className="app-frame">
      <Loader />
      <Error />
      <Header
        variant={meta.header}
        title={meta.title}
        onMenuClick={() => setSidebarOpen(true)}
      />
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogoutClick={handleLogoutClick}
      />
      <LogoutConfirmModal
        isLoading={isLoading}
        opened={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        onConfirm={handleConfirmLogout}
      />
      <main
        className={`app-content bg-gray-50/50 px-4 py-3 transition-opacity ${
          sidebarOpen ? "opacity-50 pointer-events-none" : "opacity-100"
        }`}
      >
        <Outlet />
      </main>

      {meta.showBottomNav && <BottomNav />}
    </div>
  );
}
