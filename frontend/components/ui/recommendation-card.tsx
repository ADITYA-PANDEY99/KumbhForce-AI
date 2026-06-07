"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Sparkles, ArrowRight, ThumbsUp, ThumbsDown } from "lucide-react";

type RecommendationPriority = "critical" | "high" | "medium" | "low";

interface RecommendationCardProps {
  title: string;
  rationale: string;
  actionType: string;
  priority: RecommendationPriority;
  confidence: number;         // 0–100
  estimatedImpact?: string;
  className?: string;
  onApprove?: () => void;
  onReject?: () => void;
  onExpand?: () => void;
}

const priorityConfig: Record<RecommendationPriority, { label: string; color: string; bg: string }> = {
  critical: { label: "CRITICAL", color: "text-danger", bg: "bg-danger/10 border-danger/30" },
  high:     { label: "HIGH",     color: "text-warning", bg: "bg-warning/10 border-warning/30" },
  medium:   { label: "MEDIUM",   color: "text-info",    bg: "bg-info/10 border-info/30" },
  low:      { label: "LOW",      color: "text-foreground-muted", bg: "bg-border border-border" },
};

export function RecommendationCard({
  title,
  rationale,
  actionType,
  priority,
  confidence,
  estimatedImpact,
  className,
  onApprove,
  onReject,
  onExpand,
}: RecommendationCardProps) {
  const pConf = priorityConfig[priority];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -2 }}
      className={cn("card-interactive rounded-lg p-4", className)}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-accent shrink-0" aria-hidden="true" />
          <span className="text-xs font-semibold text-foreground">{title}</span>
        </div>
        <span className={cn("text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border", pConf.bg, pConf.color)}>
          {pConf.label}
        </span>
      </div>

      {/* Action type */}
      <div className="flex items-center gap-1.5 mb-2">
        <span className="text-[10px] font-mono text-foreground-subtle uppercase tracking-wider">
          {actionType}
        </span>
        <ArrowRight className="h-3 w-3 text-foreground-subtle" aria-hidden="true" />
      </div>

      {/* Rationale */}
      <p className="text-[11px] text-foreground-muted leading-relaxed">{rationale}</p>

      {/* Confidence Bar */}
      <div className="mt-3">
        <div className="flex justify-between items-center mb-1">
          <span className="text-[9px] text-foreground-subtle uppercase tracking-wide font-mono">
            AI Confidence
          </span>
          <span className="text-[10px] font-mono font-bold text-primary">{confidence}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-border overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${confidence}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Impact + Actions */}
      {(estimatedImpact || onApprove || onReject) && (
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
          {estimatedImpact && (
            <span className="text-[10px] text-foreground-muted">{estimatedImpact}</span>
          )}
          <div className="flex items-center gap-2 ml-auto">
            {onExpand && (
              <button
                onClick={onExpand}
                className="text-[10px] text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Explain
              </button>
            )}
            {onReject && (
              <button
                onClick={onReject}
                className="h-7 w-7 rounded-md border border-border flex items-center justify-center hover:bg-danger/10 hover:border-danger/40 transition-colors"
                aria-label="Reject recommendation"
              >
                <ThumbsDown className="h-3 w-3 text-foreground-muted" aria-hidden="true" />
              </button>
            )}
            {onApprove && (
              <button
                onClick={onApprove}
                className="h-7 w-7 rounded-md border border-border flex items-center justify-center hover:bg-success/10 hover:border-success/40 transition-colors"
                aria-label="Approve recommendation"
              >
                <ThumbsUp className="h-3 w-3 text-foreground-muted" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}
