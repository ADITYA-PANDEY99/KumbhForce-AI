"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { AlertTriangle, AlertCircle, Info, CheckCircle, LucideIcon } from "lucide-react";

type AlertSeverity = "info" | "warning" | "danger" | "success";

interface AlertCardProps {
  title: string;
  message: string;
  severity: AlertSeverity;
  timestamp?: string;
  sectorId?: string;
  icon?: LucideIcon;
  className?: string;
  onDismiss?: () => void;
  onAction?: () => void;
  actionLabel?: string;
}

const severityConfig: Record<AlertSeverity, {
  icon: LucideIcon;
  bgClass: string;
  textClass: string;
  borderClass: string;
  glowClass: string;
}> = {
  info: {
    icon: Info,
    bgClass: "bg-info/8",
    textClass: "text-info",
    borderClass: "border-info/25",
    glowClass: "",
  },
  warning: {
    icon: AlertTriangle,
    bgClass: "bg-warning/8",
    textClass: "text-warning",
    borderClass: "border-warning/25",
    glowClass: "glow-warning",
  },
  danger: {
    icon: AlertCircle,
    bgClass: "bg-danger/8",
    textClass: "text-danger",
    borderClass: "border-danger/25",
    glowClass: "glow-danger",
  },
  success: {
    icon: CheckCircle,
    bgClass: "bg-success/8",
    textClass: "text-success",
    borderClass: "border-success/25",
    glowClass: "glow-success",
  },
};

export function AlertCard({
  title,
  message,
  severity,
  timestamp,
  sectorId,
  className,
  onDismiss,
  onAction,
  actionLabel = "Investigate",
}: AlertCardProps) {
  const config = severityConfig[severity];
  const SeverityIcon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 8 }}
      transition={{ duration: 0.25 }}
      className={cn(
        "rounded-lg border p-4",
        config.bgClass,
        config.borderClass,
        config.glowClass,
        className
      )}
      role="alert"
    >
      <div className="flex items-start gap-3">
        <SeverityIcon
          className={cn("h-4 w-4 mt-0.5 shrink-0", config.textClass)}
          aria-hidden="true"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <p className={cn("text-xs font-semibold", config.textClass)}>{title}</p>
            {sectorId && (
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-card border border-border text-foreground-muted shrink-0">
                {sectorId}
              </span>
            )}
          </div>
          <p className="text-xs text-foreground-muted mt-0.5 leading-relaxed">{message}</p>
          {(timestamp || onAction || onDismiss) && (
            <div className="flex items-center justify-between mt-2.5">
              {timestamp && (
                <span className="text-[10px] text-foreground-subtle font-mono">{timestamp}</span>
              )}
              <div className="flex items-center gap-2 ml-auto">
                {onAction && (
                  <button
                    onClick={onAction}
                    className={cn(
                      "text-[10px] font-semibold px-2 py-0.5 rounded transition-colors",
                      config.textClass,
                      "hover:bg-card/60"
                    )}
                  >
                    {actionLabel}
                  </button>
                )}
                {onDismiss && (
                  <button
                    onClick={onDismiss}
                    className="text-[10px] text-foreground-subtle hover:text-foreground transition-colors"
                    aria-label="Dismiss alert"
                  >
                    Dismiss
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
