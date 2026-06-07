"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface CommandCardProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  children?: React.ReactNode;
  className?: string;
  tooltip?: string;
  variant?: "default" | "danger" | "success" | "warning";
  badge?: string;
  onClick?: () => void;
}

const variantBorder: Record<string, string> = {
  default: "",
  danger: "glow-danger",
  success: "glow-success",
  warning: "glow-warning",
};

export function CommandCard({
  title,
  subtitle,
  icon: Icon,
  children,
  className,
  tooltip,
  variant = "default",
  badge,
  onClick,
}: CommandCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      whileHover={{ y: -2 }}
      title={tooltip}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === "Enter" && onClick() : undefined}
      className={cn(
        "card-interactive rounded-lg p-5",
        variantBorder[variant],
        onClick && "cursor-pointer",
        className
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5">
          {Icon && (
            <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
              <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
            </div>
          )}
          <div>
            <h3 className="text-sm font-semibold text-foreground leading-tight">{title}</h3>
            {subtitle && (
              <p className="text-xs text-foreground-muted mt-0.5">{subtitle}</p>
            )}
          </div>
        </div>
        {badge && (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-primary/10 text-primary border border-primary/20 shrink-0">
            {badge}
          </span>
        )}
      </div>
      {children && <div className="mt-2">{children}</div>}
    </motion.div>
  );
}
