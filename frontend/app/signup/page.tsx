"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Zap, Mail, Lock, User, UserCheck } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Command Center Officer");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/login");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,var(--card),var(--background))] flex flex-col justify-between py-12 px-6 lg:px-8 relative overflow-hidden">
      
      {/* Decorative backdrop blobs */}
      <div className="absolute top-[-10%] right-[-10%] h-[50vh] w-[50vh] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] h-[50vh] w-[50vh] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      {/* Spacing placeholder */}
      <div />

      <div className="sm:mx-auto sm:w-full sm:max-w-md space-y-6 z-10">
        
        {/* Branding badge */}
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary shadow-glow mb-4">
            <Zap className="h-6 w-6" />
          </div>
          <h2 className="text-center text-2xl font-bold tracking-tight text-foreground">
            Register Operator
          </h2>
          <p className="mt-1 text-center text-xs text-foreground-muted uppercase tracking-widest font-mono">
            Command Center Credentials Entry
          </p>
        </div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-xl p-8 shadow-elevated space-y-6"
        >
          <form onSubmit={handleSignup} className="space-y-4 text-xs">
            
            <div className="space-y-1">
              <label className="text-[10px] text-foreground-subtle uppercase block font-semibold">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-foreground-subtle" />
                <input
                  type="text"
                  required
                  placeholder="Officer Aditya Pandey"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded bg-background-secondary border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] text-foreground-subtle uppercase block font-semibold">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-foreground-subtle" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded bg-background-secondary border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-foreground-subtle uppercase block font-semibold">Operational Role</label>
                <div className="relative">
                  <UserCheck className="absolute left-3 top-3 h-4 w-4 text-foreground-subtle" />
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded bg-background-secondary border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="Command Center Officer">Command Center Officer</option>
                    <option value="Sector Coordinator">Sector Coordinator</option>
                    <option value="Operations Supervisor">Operations Supervisor</option>
                    <option value="Event Administrator">Event Administrator</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 px-4 rounded bg-primary text-white font-bold shadow-elevated flex items-center justify-center gap-2 hover:bg-primary/95 transition-all cursor-pointer"
              >
                {isLoading ? "CREATING CREDENTIALS..." : "REGISTER OPERATOR DISPATCH"}
              </button>
            </div>

          </form>

          {/* Footer bridge */}
          <p className="text-center text-xs text-foreground-muted">
            Already have credentials?{" "}
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
