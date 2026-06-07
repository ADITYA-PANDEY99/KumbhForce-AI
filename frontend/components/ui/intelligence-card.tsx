"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Brain, ExternalLink, LucideIcon } from "lucide-react";

interface IntelligenceCardProps {
  title: string;
  summary: string;
  source?: string;
  sourceLabel?: string;
  icon?: LucideIcon;
  tags?: string[];
  className?: string;
  onClick?: () => void;
  isLoading?: boolean;
  timestamp?: string;
}

export function IntelligenceCard({
  title,
  summary,
  source,
  sourceLabel,
  icon: Icon = Brain,
  tags,
  className,
  onClick,
  isLoading = false,
  timestamp,
}: IntelligenceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28 }}
      whileHover={{ y: -1.5 }}
      onClick={onClick}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? "button" : undefined}
      onKeyDown={onClick ? (e) => e.key === "Enter" && onClick() : undefined}
      className={cn(
        "card-interactive rounded-lg p-4 relative overflow-hidden",
        onClick && "cursor-pointer",
        className
      )}
    >
      {/* Gradient accent strip */}
      <div
        className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-accent to-primary rounded-l-lg"
        aria-hidden="true"
      />

      <div className="pl-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <Icon className="h-4 w-4 text-accent shrink-0" aria-hidden="true" />
            {isLoading ? (
              <div className="h-4 w-36 rounded shimmer" />
            ) : (
              <p className="text-xs font-semibold text-foreground">{title}</p>
            )}
          </div>
          {source && (
            <a
              href={source}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-primary flex items-center gap-1 hover:underline shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              {sourceLabel ?? "Source"}
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
            </a>
          )}
        </div>

        {/* Summary */}
        {isLoading ? (
          <div className="space-y-2">
            <div className="h-3 w-full rounded shimmer" />
            <div className="h-3 w-3/4 rounded shimmer" />
          </div>
        ) : (
          <p className="text-[11px] text-foreground-muted leading-relaxed">{summary}</p>
        )}

        {/* Tags + Timestamp */}
        {(tags?.length || timestamp) && !isLoading && (
          <div className="flex items-center justify-between mt-3">
            <div className="flex flex-wrap gap-1">
              {tags?.map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] px-1.5 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20 font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>
            {timestamp && (
              <span className="text-[9px] text-foreground-subtle font-mono">{timestamp}</span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
