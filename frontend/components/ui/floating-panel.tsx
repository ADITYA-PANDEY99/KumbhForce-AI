"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface FloatingPanelProps {
  title: string;
  subtitle?: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: "sm" | "md" | "lg" | "xl";
  position?: "right" | "center" | "left";
  className?: string;
}

const widthMap: Record<string, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
};

export function FloatingPanel({
  title,
  subtitle,
  isOpen,
  onClose,
  children,
  width = "md",
  position = "center",
  className,
}: FloatingPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Trap focus within panel when open
  useEffect(() => {
    if (isOpen && panelRef.current) {
      panelRef.current.focus();
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className={cn(
            "fixed inset-0 z-50 flex items-start",
            position === "center" && "justify-center pt-[12vh]",
            position === "right" && "justify-end pt-16 pr-4",
            position === "left" && "justify-start pt-16 pl-4"
          )}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-background/75 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            ref={panelRef}
            tabIndex={-1}
            initial={{ opacity: 0, y: position === "center" ? -16 : 0, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: position === "center" ? -12 : 0, scale: 0.97 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            role="dialog"
            aria-label={title}
            aria-modal="true"
            className={cn(
              "relative w-full bg-card border border-border rounded-lg shadow-elevated overflow-hidden",
              widthMap[width],
              className
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-background-secondary/60">
              <div>
                <h2 className="text-sm font-semibold text-foreground">{title}</h2>
                {subtitle && <p className="text-xs text-foreground-muted mt-0.5">{subtitle}</p>}
              </div>
              <button
                onClick={onClose}
                className="h-8 w-8 flex items-center justify-center rounded-md border border-border hover:bg-border text-foreground-muted hover:text-foreground transition-colors"
                aria-label="Close panel"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            {/* Body */}
            <div className="p-5 overflow-y-auto max-h-[70vh]">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
