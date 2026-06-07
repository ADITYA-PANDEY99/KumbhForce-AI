"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

type TimelineEventType = "completed" | "active" | "pending" | "warning";

interface TimelineEvent {
  id: string;
  time: string;
  title: string;
  description?: string;
  type: TimelineEventType;
  icon?: LucideIcon;
  actor?: string;
}

interface TimelineCardProps {
  title?: string;
  events: TimelineEvent[];
  className?: string;
}

const typeStyles: Record<TimelineEventType, { dot: string; line: string; badge: string }> = {
  completed: {
    dot: "bg-success border-success/50",
    line: "bg-success/25",
    badge: "bg-success/10 text-success",
  },
  active: {
    dot: "bg-primary border-primary/50 animate-glow-pulse",
    line: "bg-primary/25",
    badge: "bg-primary/10 text-primary",
  },
  pending: {
    dot: "bg-foreground-subtle border-border",
    line: "bg-border",
    badge: "bg-border text-foreground-muted",
  },
  warning: {
    dot: "bg-warning border-warning/50",
    line: "bg-warning/25",
    badge: "bg-warning/10 text-warning",
  },
};

export function TimelineCard({ title, events, className }: TimelineCardProps) {
  return (
    <div className={cn("card-interactive rounded-lg p-5", className)}>
      {title && (
        <h3 className="text-sm font-semibold text-foreground mb-4">{title}</h3>
      )}
      <ol className="space-y-0" aria-label="Mission timeline">
        {events.map((event, idx) => {
          const styles = typeStyles[event.type];
          const isLast = idx === events.length - 1;
          const Icon = event.icon;

          return (
            <motion.li
              key={event.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.06, duration: 0.25 }}
              className="flex gap-3"
            >
              {/* Timeline spine */}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "h-3 w-3 rounded-full border-2 mt-0.5 shrink-0",
                    styles.dot
                  )}
                  aria-hidden="true"
                />
                {!isLast && (
                  <div className={cn("w-0.5 flex-1 my-1", styles.line)} aria-hidden="true" />
                )}
              </div>

              {/* Content */}
              <div className={cn("pb-4", isLast && "pb-0")}>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[10px] font-mono text-foreground-subtle">{event.time}</span>
                  <span className={cn("text-[9px] font-semibold px-1.5 py-0.5 rounded uppercase tracking-wide", styles.badge)}>
                    {event.type}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  {Icon && <Icon className="h-3 w-3 text-foreground-muted" aria-hidden="true" />}
                  <p className="text-xs font-semibold text-foreground">{event.title}</p>
                </div>
                {event.description && (
                  <p className="text-[11px] text-foreground-muted mt-0.5 leading-relaxed">{event.description}</p>
                )}
                {event.actor && (
                  <p className="text-[10px] text-foreground-subtle mt-1">— {event.actor}</p>
                )}
              </div>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}
