import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthUser {
  id: string;
  name: string;
  profile_image: string | null;
}

interface AuthState {
  user: AuthUser | null;

  setUser: (user: AuthUser) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,

      setUser: (user) => set({ user }),

      clearUser: () => set({ user: null }),
    }),
    {
      name: "auth-ui", // UI cache only
      partialize: (state) => ({
        user: state.user, // ONLY persist user UI
      }),
    }
  )
);
