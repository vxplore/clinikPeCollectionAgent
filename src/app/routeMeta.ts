export type HeaderVariant = "main" | "back" | "none";
export interface RouteMeta {
  header: HeaderVariant;
  title?: string;
  showBottomNav?: boolean;
}
export const routeMeta: Record<string, RouteMeta> = {
  "/": {
    header: "none",
    showBottomNav: false,
  },

  "/login": {
    header: "none",
    showBottomNav: false,
  },

  "/dashboard": {
    title: "Dashboard",
    header: "main",
    showBottomNav: true,
  },

  "/assignments": {
    header: "main",
    title: "Assignments",
    showBottomNav: true,
  },

  "/assignments/:id": {
    header: "back",
    title: "Assignment Details",
    showBottomNav: true,
  },

  "/profile": {
    header: "back",
    title: "Profile",
    showBottomNav: true,
  },
  "/assignments/:id/add-test": {
    header: "back",
    title: "Add Test",
    showBottomNav: true,
  },
  "/settings": {
    header: "back",
    title: "Settings",
    showBottomNav: true,
  },
  "/help-support": {
    header: "back",
    title: "Help / Support",
    showBottomNav: true,
  },
  "/payments": {
    header: "back",
    title: "Payments",
    showBottomNav: true,
  },
  "/history": {
    header: "back",
    title: "History",
    showBottomNav: true,
  },
  "/map-view": {
    header: "back",
    title: "Map View",
    showBottomNav: false,
  },
  "/notifications": {
    header: "back",
    title: "Notifications",
    showBottomNav: true,
  },
};
