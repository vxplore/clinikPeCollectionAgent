import { useMutation } from "@tanstack/react-query";
import { logout as logoutApi } from "../../../apis/modules/auth/auth.api";
import { useAuthStore } from "../../../stores/auth.store";

export function useLogout() {
  const storeLogout = useAuthStore((state) => state.logout);

  const mutation = useMutation({
    mutationFn: logoutApi,
    onSettled: () => {
      // Clear Zustand state and localStorage
      storeLogout();
      // Redirect to login
      window.location.replace("/login");
    },
  });

  return {
    logout: mutation.mutate,
    isLoading: mutation.isPending,
  };
}
