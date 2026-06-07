"use client";

import React, { useEffect } from "react";
import { useGlobalStore } from "@/store/global-store";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useGlobalStore((state) => state.theme);

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Clear old theme mappings
    root.classList.remove(
      "theme-kumbh-sunrise",
      "theme-neon-command",
      "theme-executive-light"
    );

    // Apply active class
    if (theme === "kumbh-sunrise") {
      root.classList.add("theme-kumbh-sunrise");
    } else if (theme === "neon-command") {
      root.classList.add("theme-neon-command");
    } else if (theme === "executive-light") {
      root.classList.add("theme-executive-light");
    }
  }, [theme]);

  return <>{children}</>;
}
