import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ThemeType = "command-aurora" | "kumbh-sunrise" | "neon-command" | "executive-light";

export interface Notification {
  id: string;
  title: string;
  message: string;
  severity: "info" | "warning" | "error";
  timestamp: string;
  read: boolean;
}

export interface AuditLog {
  id: string;
  user: string;
  action: string;
  details: string;
  timestamp: string;
}

interface AppState {
  theme: ThemeType;
  notifications: Notification[];
  auditLogs: AuditLog[];
  isCommandPaletteOpen: boolean;
  isNotificationDrawerOpen: boolean;
  setTheme: (theme: ThemeType) => void;
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "read">) => void;
  markNotificationsAsRead: () => void;
  addAuditLog: (log: Omit<AuditLog, "id" | "timestamp">) => void;
  toggleCommandPalette: (open?: boolean) => void;
  toggleNotificationDrawer: (open?: boolean) => void;
}

export const useGlobalStore = create<AppState>()(
  persist(
    (set) => ({
      theme: "command-aurora",
      notifications: [
        {
          id: "initial-alert",
          title: "System Online",
          message: "KumbhForce AI Command Center is active & monitoring sector metrics.",
          severity: "info",
          timestamp: new Date().toISOString(),
          read: false
        }
      ],
      auditLogs: [],
      isCommandPaletteOpen: false,
      isNotificationDrawerOpen: false,
      setTheme: (theme) => set({ theme }),
      addNotification: (n) => set((state) => ({
        notifications: [
          {
            ...n,
            id: Math.random().toString(),
            timestamp: new Date().toISOString(),
            read: false
          },
          ...state.notifications
        ]
      })),
      markNotificationsAsRead: () => set((state) => ({
        notifications: state.notifications.map((n) => ({ ...n, read: true }))
      })),
      addAuditLog: (log) => set((state) => ({
        auditLogs: [
          {
            ...log,
            id: Math.random().toString(),
            timestamp: new Date().toISOString()
          },
          ...state.auditLogs
        ]
      })),
      toggleCommandPalette: (open) => set((state) => ({
        isCommandPaletteOpen: open !== undefined ? open : !state.isCommandPaletteOpen
      })),
      toggleNotificationDrawer: (open) => set((state) => ({
        isNotificationDrawerOpen: open !== undefined ? open : !state.isNotificationDrawerOpen
      }))
    }),
    {
      name: "kumbhforce-global-storage",
      partialize: (state) => ({ theme: state.theme, notifications: state.notifications, auditLogs: state.auditLogs })
    }
  )
);
