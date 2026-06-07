"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { AppShell } from "@/components/layout/app-shell";
import { CommandCard } from "@/components/ui/command-card";
import { FloatingPanel } from "@/components/ui/floating-panel";
import {
  UserCog,
  Shield,
  Activity,
  CheckCircle,
  AlertTriangle,
  UserX,
  Edit,
  Eye,
  Plus
} from "lucide-react";

interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: "Command Center Officer" | "Sector Coordinator" | "Operations Supervisor" | "Event Administrator";
  status: "Active" | "Inactive" | "Disabled";
  lastActive: string;
}

const mockUsers: UserRecord[] = [
  { id: "USR-001", name: "Aditya Pandey", email: "aditya.p@kumbhforce.gov.in", role: "Event Administrator", status: "Active", lastActive: "Active Now" },
  { id: "USR-002", name: "Rohan Saxena", email: "rohan.s@kumbhforce.gov.in", role: "Command Center Officer", status: "Active", lastActive: "2 minutes ago" },
  { id: "USR-003", name: "Priya Sharma", email: "priya.s@kumbhforce.gov.in", role: "Sector Coordinator", status: "Active", lastActive: "15 minutes ago" },
  { id: "USR-004", name: "Amit Joshi", email: "amit.j@kumbhforce.gov.in", role: "Operations Supervisor", status: "Inactive", lastActive: "3 hours ago" },
  { id: "USR-005", name: "Vikram Nair", email: "vikram.n@kumbhforce.gov.in", role: "Command Center Officer", status: "Disabled", lastActive: "3 days ago" }
];

export default function UserManagementPage() {
  const [users, setUsers] = useState<UserRecord[]>(mockUsers);
  const [selectedUser, setSelectedUser] = useState<UserRecord | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);

  const toggleUserStatus = (userId: string) => {
    setUsers(users.map(u => {
      if (u.id === userId) {
        const newStatus = u.status === "Active" ? "Disabled" : "Active";
        return { ...u, status: newStatus };
      }
      return u;
    }));
  };

  return (
    <AppShell pageTitle="User Management">
      <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
        
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <UserCog className="h-6 w-6 text-primary" /> User Credentials Control
            </h1>
            <p className="text-sm text-foreground-muted mt-1">
              Audit access privileges, assign operational roles, and manage logged command center personnel.
            </p>
          </div>
        </div>

        {/* Dashboard table layout */}
        <div className="rounded-lg border border-border bg-card overflow-hidden">
          <div className="p-3 bg-background-secondary/50 border-b border-border/40 flex justify-between items-center text-[10px] text-foreground-subtle font-mono">
            <span>COMMAND CENTER OPERATORS REGISTRY</span>
            <span>{users.length} MAPPED ROLES</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-border/60 bg-background-secondary/20 text-foreground-subtle uppercase text-[9px] font-mono">
                  <th className="p-3">Operator</th>
                  <th className="p-3">Assigned Role</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Last Active</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-background-secondary/50 transition-colors">
                    <td className="p-3">
                      <p className="font-semibold text-foreground">{user.name}</p>
                      <p className="text-[9px] text-foreground-subtle mt-0.5 font-mono">{user.email} • {user.id}</p>
                    </td>
                    <td className="p-3">
                      <span className="font-medium text-foreground flex items-center gap-1">
                        <Shield className="h-3.5 w-3.5 text-primary" /> {user.role}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`text-[9px] font-mono uppercase font-bold px-1.5 py-0.5 rounded ${
                        user.status === "Active" ? "bg-success/10 text-success border border-success/20" :
                        user.status === "Inactive" ? "bg-warning/10 text-warning border border-warning/20" :
                        "bg-danger/10 text-danger border border-danger/20"
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="p-3 font-mono text-foreground-subtle">{user.lastActive}</td>
                    <td className="p-3 text-right space-x-1">
                      <button
                        onClick={() => { setSelectedUser(user); setIsViewOpen(true); }}
                        className="p-1 rounded border border-border hover:bg-background-secondary text-foreground-muted hover:text-foreground transition-all cursor-pointer"
                        title="View details"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => toggleUserStatus(user.id)}
                        className={`p-1 rounded border text-foreground-muted hover:text-foreground transition-all cursor-pointer ${
                          user.status === "Active" ? "border-danger/20 hover:bg-danger/5 text-danger/80" : "border-success/20 hover:bg-success/5 text-success/80"
                        }`}
                        title={user.status === "Active" ? "Disable credentials" : "Enable credentials"}
                      >
                        <UserX className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* USER DETAILS FLOATING DIALOG */}
      <FloatingPanel
        title="Command Operator Profile"
        subtitle="Security audit authorization ledger"
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        width="sm"
      >
        {selectedUser && (
          <div className="space-y-4 text-xs font-mono">
            
            <div className="rounded p-4 bg-background-secondary border border-border space-y-2">
              <div>
                <span className="text-[9px] text-foreground-subtle block uppercase font-bold">OPERATOR NAME</span>
                <span className="text-sm font-bold text-foreground">{selectedUser.name}</span>
              </div>

              <div>
                <span className="text-[9px] text-foreground-subtle block uppercase font-bold">EMAIL ADDRESS</span>
                <span className="text-foreground">{selectedUser.email}</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[9px] text-foreground-subtle block uppercase font-bold">SECURITY ROLE</span>
                  <span className="text-foreground font-semibold">{selectedUser.role}</span>
                </div>
                <div>
                  <span className="text-[9px] text-foreground-subtle block uppercase font-bold">CREDENTIALS STATE</span>
                  <span className={`text-[9px] uppercase font-bold px-1.5 py-0.5 rounded ${
                    selectedUser.status === "Active" ? "bg-success/10 text-success border border-success/25" : "bg-danger/10 text-danger border border-danger/25"
                  }`}>{selectedUser.status}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-border/40">
              <button
                onClick={() => setIsViewOpen(false)}
                className="px-4 py-2 bg-primary text-white rounded text-[11px] font-bold shadow-elevated cursor-pointer"
              >
                Done
              </button>
            </div>

          </div>
        )}
      </FloatingPanel>

    </AppShell>
  );
}
