"use client";

import React, { useState } from "react";
import { useGlobalStore, ThemeType } from "@/store/global-store";
import { Palette } from "lucide-react";

const themes: { name: string; id: ThemeType }[] = [
  { name: "Aurora (Dark Teal)", id: "command-aurora" },
  { name: "Sunrise (Saffron)", id: "kumbh-sunrise" },
  { name: "Neon (Cyberpunk)", id: "neon-command" },
  { name: "Light Mode", id: "executive-light" },
];

export function ThemeSwitcher() {
  const { theme, setTheme } = useGlobalStore();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-9 w-9 rounded-md border border-border flex items-center justify-center hover:bg-border text-foreground transition-colors"
        title="Switch UI Theme"
      >
        <Palette className="h-4 w-4" />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-30" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-md shadow-lg py-1 z-40">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setTheme(t.id);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-xs hover:bg-border transition-colors ${
                  theme === t.id ? "text-primary font-semibold" : "text-foreground/80"
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
