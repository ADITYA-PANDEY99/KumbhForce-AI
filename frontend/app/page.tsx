import type { Metadata } from "next";
import { AppShell } from "@/components/layout/app-shell";
import { CommandCenterDashboard } from "@/components/pages/command-center-dashboard";

export const metadata: Metadata = {
  title: "Command Center",
};

export default function CommandCenterPage() {
  return (
    <AppShell pageTitle="Command Center">
      <CommandCenterDashboard />
    </AppShell>
  );
}
