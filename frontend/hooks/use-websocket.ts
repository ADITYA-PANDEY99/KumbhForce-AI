import { useEffect, useRef } from "react";
import { useGlobalStore } from "@/store/global-store";

export const useWebSocket = (url: string) => {
  const ws = useRef<WebSocket | null>(null);
  const addNotification = useGlobalStore((state) => state.addNotification);
  const addAuditLog = useGlobalStore((state) => state.addAuditLog);

  useEffect(() => {
    // Prevent initialization during static export or build phases
    if (typeof window === "undefined") return;

    const connect = () => {
      try {
        ws.current = new WebSocket(url);

        ws.current.onopen = () => {
          addAuditLog({
            user: "System",
            action: "Websocket Connection Established",
            details: `Subscribed to live telemetry stream: ${url}`
          });
        };

        ws.current.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data.type === "notification") {
              addNotification({
                title: data.title || "Alert",
                message: data.message || "",
                severity: data.severity || "info"
              });
            }
            if (data.type === "audit") {
              addAuditLog({
                user: data.user || "System",
                action: data.action || "Telemetry Event",
                details: data.details || ""
              });
            }
          } catch {
            // Ignore malformed text payloads
          }
        };

        ws.current.onclose = () => {
          // Attempt reconnection after 5 seconds
          setTimeout(connect, 5000);
        };
      } catch {
        // Suppress connection failures and let reconnect handle it
      }
    };

    connect();

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [url, addNotification, addAuditLog]);

  return ws.current;
};
