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
function AppContents() {
  return (
    <Routes>
      <Route path="/" element={<SplashPage />} />
      <Route path="/login" element={<LoginPage />} />
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
           {/* WRONG ROUTE (404) */}
          <Route path="*" element={<NotFound />} />
      </Route>

      {/* No AppShell */}
    </Routes>
  );
}

export default AppContents;
