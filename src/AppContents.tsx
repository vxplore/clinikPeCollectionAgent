import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import AppShell from "./layouts/AppShell/AppShell";
import DashboardPage from "./pages/dashboard/DashboardPage";
import SplashPage from "./pages/auth/SplashPage";
import AssignmentPage from "./pages/assignments/AssignmentPage";
import AssignmentPageDetails from "./pages/assignments/AssignmentPageDetails";
import AddTest from "./pages/Test/AddTest";
import Profile from "./pages/Profile/Profile";
import Settings from "./pages/Settings/Settings";
import HelpSupport from "./pages/HelpSupport/HelpSupport";
import Payments from "./pages/Payments/Payments";
import History from "./pages/history/History";
import MapView from "./shared/MapView";
import NotFound from "./shared/ui/NotFound";
import EmptyState from "./shared/ui/EmptyState";
import { useAuthBootstrap } from "./app/useAuthBootstrap";
import { PrivateRoute, PublicRoute } from "./app/guards";
import Notifications from "./pages/Notifications/Notifications";

function AppContents() {
  useAuthBootstrap();
  return (
    <Routes>
      <Route path="/" element={<SplashPage />} />
      {/* Public Routes */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

      {/* Private/Protected Routes */}
      <Route element={<PrivateRoute />}>
        <Route element={<AppShell />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/assignments" element={<AssignmentPage />} />
          <Route path="/assignments/:id" element={<AssignmentPageDetails />} />
          <Route path="/assignments/:id/add-test" element={<AddTest />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/help-support" element={<HelpSupport />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/history" element={<History />} />
          <Route path="/map-view" element={<MapView />} />
          <Route path="/empty-state" element={<EmptyState />} />
           

          <Route path="/notifications" element={<Notifications />} />
        </Route>
      </Route>

      {/* 404 Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppContents;
