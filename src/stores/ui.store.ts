import { create } from "zustand";

interface UIState {
  isLoading: boolean;
  error: string | null;
  notificationCount: number;

  showLoader: () => void;
  hideLoader: () => void;

  setError: (message: string) => void;
  clearError: () => void;

  setNotificationCount: (count: number) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isLoading: false,
  error: null,
  notificationCount: 0,

  showLoader: () => set({ isLoading: true }),
  hideLoader: () => set({ isLoading: false }),

  setError: (message) => set({ error: message }),
  clearError: () => set({ error: null }),

  setNotificationCount: (count) => set({ notificationCount: count }),
}));
