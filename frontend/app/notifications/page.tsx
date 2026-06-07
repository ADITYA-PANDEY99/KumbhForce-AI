import type { Metadata } from "next";
import { AppShell } from "@/components/layout/app-shell";
import { PlaceholderPage } from "@/components/pages/placeholder-page";

export const metadata: Metadata = { title: "Notifications" };

export default function NotificationsPage() {
  return (
    <AppShell pageTitle="Notifications">
      <PlaceholderPage
        title="Notifications"
        subtitle="Centralized alert inbox — operational warnings, system updates, and AI-generated alerts"
        iconName="Bell"
        sections={[
          { label: "Alert Filters", width: "full", height: "sm" },
          { label: "Alert Feed", width: "half", height: "xl" },
          { label: "Alert Statistics", width: "half", height: "md" },
        ]}
      />
    </AppShell>
  );
}
