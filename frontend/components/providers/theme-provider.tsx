"use client";

import React, { useEffect } from "react";
import { useGlobalStore } from "@/store/global-store";

const THEME_CLASSES = [
  "theme-kumbh-sunrise",
  "theme-neon-command",
  "theme-executive-light",
] as const;

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useGlobalStore((state) => state.theme);

  useEffect(() => {
    const root = window.document.documentElement;

    // Remove all theme classes
    THEME_CLASSES.forEach((cls) => root.classList.remove(cls));

    // Apply the selected theme class (command-aurora is default via :root)
    if (theme === "kumbh-sunrise") root.classList.add("theme-kumbh-sunrise");
    else if (theme === "neon-command") root.classList.add("theme-neon-command");
    else if (theme === "executive-light") root.classList.add("theme-executive-light");
  }, [theme]);

  return <>{children}</>;
}
