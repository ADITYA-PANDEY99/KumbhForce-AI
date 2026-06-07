"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import {
  FileText,
  Activity,
  UserCheck,
  Zap,
  TrendingUp,
  Clock,
  Compass
} from "lucide-react";

interface AuditLogRecord {
  id: string;
  user: string;
  action: string;
  timestamp: string;
  entity: string;
  status: "Success" | "Flagged" | "Rejected";
}

const mockAuditLogs: AuditLogRecord[] = [
  { id: "AUD-991", user: "Aditya Pandey", action: "Simulation Executed", timestamp: "23:15:22 IST", entity: "Scenario Simulator (Surge Model)", status: "Success" },
  { id: "AUD-992", user: "Rohan Saxena", action: "Volunteer Redeployed", timestamp: "23:08:44 IST", entity: "VOL-0102 from S-03 to S-01", status: "Success" },
  { id: "AUD-993", user: "Priya Sharma", action: "Incident Created", timestamp: "23:05:10 IST", entity: "INC-9104 Cardiac Distress", status: "Success" },
  { id: "AUD-994", user: "AI Engine", action: "AI Recommendation Generated", timestamp: "22:58:12 IST", entity: "Workforce Optimizer rebalance suggestion", status: "Success" },
  { id: "AUD-995", user: "Vikram Nair", action: "Settings Modified", timestamp: "21:40:02 IST", entity: "Theme parameters updated to Sunrise", status: "Success" }
];

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<AuditLogRecord[]>(mockAuditLogs);

  return (
    <AppShell pageTitle="Audit Logs">
      <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
        
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" /> System Audit Logs
            </h1>
            <p className="text-sm text-foreground-muted mt-1">
              Immutably track all operations commands, volunteer dispatches, simulator stress runs, and settings modifications.
            </p>
          </div>
        </div>

        {/* Mapped audit logs registry table */}
        <div className="rounded-lg border border-border bg-card overflow-hidden">
          <div className="p-3 bg-background-secondary/50 border-b border-border/40 flex justify-between items-center text-[10px] text-foreground-subtle font-mono">
            <span>OPERATIONAL AUDIT TRAIL LOGS</span>
            <span>{logs.length} REGISTERED DISPATCH LOGS</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-border/60 bg-background-secondary/20 text-foreground-subtle uppercase text-[9px] font-mono">
                  <th className="p-3">Audit ID</th>
                  <th className="p-3">Operator</th>
                  <th className="p-3">Action Completed</th>
                  <th className="p-3">Entity Affected</th>
                  <th className="p-3">Timestamp</th>
                  <th className="p-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-background-secondary/50 transition-colors">
                    <td className="p-3 font-mono font-semibold text-primary">{log.id}</td>
                    <td className="p-3 font-medium text-foreground">{log.user}</td>
                    <td className="p-3">
                      <span className="font-semibold text-foreground">{log.action}</span>
                    </td>
                    <td className="p-3 text-foreground-muted font-mono">{log.entity}</td>
                    <td className="p-3 font-mono text-foreground-subtle">{log.timestamp}</td>
                    <td className="p-3 text-right">
                      <span className="text-[9px] font-mono uppercase font-bold px-1.5 py-0.5 rounded bg-success/10 text-success border border-success/20">
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </AppShell>
  );
}
