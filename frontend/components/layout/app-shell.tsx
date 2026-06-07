"use client";

import React from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { StatusBar } from "@/components/layout/status-bar";
import { CommandPalette } from "@/components/command-palette";
import { motion } from "framer-motion";

interface AppShellProps {
  children: React.ReactNode;
  pageTitle?: string;
}

export function AppShell({ children, pageTitle }: AppShellProps) {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main column */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Header */}
        <Header />

        {/* Operational Status Bar */}
        <StatusBar />

        {/* Scrollable content area */}
        <motion.main
          key={pageTitle}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="flex-1 overflow-y-auto"
          id="main-content"
          tabIndex={-1}
          aria-label={pageTitle ? `${pageTitle} page` : "Main content"}
        >
          {children}
        </motion.main>

        {/* Footer */}
        <footer className="h-8 flex items-center px-6 border-t border-border bg-card/40 shrink-0">
          <p className="text-[10px] text-foreground-subtle font-mono">
            KumbhForce AI · v1.0.0 · Planned & Designed by{" "}
            <span className="text-primary">Aditya Pandey</span>
          </p>
          <div className="ml-auto flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true" />
            <span className="text-[10px] text-success font-mono font-semibold">All Systems Operational</span>
          </div>
        </footer>
      </div>

      {/* Global overlays */}
      <CommandPalette />
    </div>
  );
}
