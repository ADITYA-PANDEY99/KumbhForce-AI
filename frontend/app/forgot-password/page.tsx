"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, Mail, Key } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRecover = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,var(--card),var(--background))] flex flex-col justify-between py-12 px-6 lg:px-8 relative overflow-hidden">
      
      {/* Backdrop */}
      <div className="absolute top-[-10%] right-[-10%] h-[50vh] w-[50vh] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      
      <div />

      <div className="sm:mx-auto sm:w-full sm:max-w-md space-y-6 z-10">
        
        {/* Logo */}
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary shadow-glow mb-4">
            <Key className="h-6 w-6" />
          </div>
          <h2 className="text-center text-2xl font-bold tracking-tight text-foreground">
            Password Recovery
          </h2>
          <p className="mt-1 text-center text-xs text-foreground-muted uppercase tracking-widest font-mono">
            Security Control dispatch access
          </p>
        </div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-xl p-8 shadow-elevated space-y-6"
        >
          {!isSent ? (
            <form onSubmit={handleRecover} className="space-y-4 text-xs">
              <p className="text-xs text-foreground-muted leading-relaxed">
                Provide your command center registered email address. We will dispatch a secure validation pin to reset operator access.
              </p>

              <div className="space-y-1">
                <label className="text-[10px] text-foreground-subtle uppercase block font-semibold">Email address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-foreground-subtle" />
                  <input
                    type="email"
                    required
                    placeholder="name@kumbhforce.gov.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded bg-background-secondary border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 px-4 rounded bg-primary text-white font-bold shadow-elevated flex items-center justify-center gap-2 hover:bg-primary/95 transition-all cursor-pointer"
                >
                  {isLoading ? "DISPATCHING CODE..." : "GENERATE RESET LINK"}
                </button>
              </div>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4 text-center text-xs"
            >
              <div className="rounded p-3 bg-success/10 border border-success/30 text-success">
                <p className="font-semibold">Reset Link Generated Successfully</p>
                <p className="text-[10px] text-success/80 mt-1">A recovery link has been dispatched to {email}.</p>
              </div>

              <p className="text-foreground-muted leading-relaxed">
                Please check your inbox or secure command logs. Links remain valid for 15 minutes.
              </p>
            </motion.div>
          )}

          <p className="text-center text-xs text-foreground-muted pt-2 border-t border-border/40">
            Remembered password?{" "}
            <Link href="/login" className="text-primary hover:underline font-semibold">
              Sign In
            </Link>
          </p>

        </motion.div>

      </div>

      {/* Credits Footer */}
      <div className="text-center space-y-1.5 z-10 mt-6">
        <p className="text-[10px] uppercase tracking-widest text-foreground-subtle font-mono">
          Concept & Design
        </p>
        <h3 className="text-sm font-bold text-foreground">
          Planned &amp; Designed by <span className="text-primary">Aditya Pandey</span>
        </h3>
        <p className="text-[9px] text-foreground-subtle font-mono">
          KumbhForce AI © 2026
        </p>
      </div>

    </div>
  );
}
