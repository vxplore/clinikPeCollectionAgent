//eta use hobe for private and public routes

import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/auth.store";
import Loader from "../components/Loader";

export function PrivateRoute() {
  const status = useAuthStore((s) => s.status);

  if (status === "loading") return <Loader />;
  console.log("PrivateRoute status:", status);
  return status === "authenticated" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
}

export function PublicRoute() {
  const status = useAuthStore((s) => s.status);
  console.log("PublicRoute status:", status);
  if (status === "loading") return <Loader />;

  return status === "unauthenticated" ? (
    <Outlet />
  ) : (
    <Navigate to="/dashboard" replace />
  );
}
