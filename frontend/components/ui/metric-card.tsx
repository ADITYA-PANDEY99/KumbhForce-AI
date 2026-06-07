"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  delta?: number;               // percentage change vs previous period
  deltaLabel?: string;
  icon?: LucideIcon;
  tooltip?: string;
  className?: string;
  skeleton?: boolean;
  onClick?: () => void;
}

function AnimatedValue({ value }: { value: string | number }) {
  return (
    <motion.span
      key={String(value)}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      {value}
    </motion.span>
  );
}

export function MetricCard({
  label,
  value,
  unit,
  delta,
  deltaLabel,
  icon: Icon,
  tooltip,
  className,
  skeleton = false,
  onClick,
}: MetricCardProps) {
  const deltaPositive = delta !== undefined && delta > 0;
  const deltaNeutral = delta === undefined || delta === 0;

  const DeltaIcon = deltaNeutral ? Minus : deltaPositive ? TrendingUp : TrendingDown;
  const deltaColor = deltaNeutral
    ? "text-foreground-muted"
    : deltaPositive
    ? "text-success"
    : "text-danger";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -2 }}
      title={tooltip}
      onClick={onClick}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? "button" : undefined}
      onKeyDown={onClick ? (e) => e.key === "Enter" && onClick() : undefined}
      className={cn("card-interactive rounded-lg p-5", onClick && "cursor-pointer", className)}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-foreground-muted uppercase tracking-wide">
          {label}
        </span>
        {Icon && (
          <div className="h-7 w-7 rounded-md bg-primary/10 flex items-center justify-center">
            <Icon className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
          </div>
        )}
      </div>

      {skeleton ? (
        <div className="h-8 w-24 rounded shimmer" />
      ) : (
        <div className="flex items-end gap-1.5">
          <span className="text-3xl font-bold tracking-tight text-foreground text-glow">
            <AnimatedValue value={value} />
          </span>
          {unit && (
            <span className="text-sm text-foreground-muted mb-1 font-mono">{unit}</span>
          )}
        </div>
      )}

      {(delta !== undefined || deltaLabel) && !skeleton && (
        <div className={cn("flex items-center gap-1.5 mt-2", deltaColor)}>
          <DeltaIcon className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="text-xs font-medium">
            {delta !== undefined ? `${Math.abs(delta)}%` : ""} {deltaLabel}
          </span>
        </div>
      )}
    </motion.div>
  );
}
