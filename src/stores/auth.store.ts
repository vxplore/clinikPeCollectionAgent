import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthUser {
  id: string;
  name: string;
  profile_image: string | null;
}

interface AuthState {
  user: AuthUser | null;
  status: "loading" | "authenticated" | "unauthenticated";

  setAuth: (user: AuthUser) => void;
  setUnauth: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      status: "loading",

      setAuth: (user) => set({ user, status: "authenticated" }),

      setUnauth: () => set({ user: null, status: "unauthenticated" }),

      logout: () => {
        // Clear Zustand state
        set({ user: null, status: "unauthenticated" });
        // Clear localStorage (auth-ui key)
        localStorage.removeItem("auth-ui");
      },
    }),
    {
      name: "auth-ui",
      partialize: (state) => ({
        user: state.user,
      }),
    }
  )
);
