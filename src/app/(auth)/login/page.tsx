"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { login } from "@/app/actions/auth";
import { toast } from "sonner";

const initialState = { error: null };

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, initialState);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (state?.error) toast.error("Sign in failed", { description: state.error });
  }, [state?.error]);

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-[var(--beige-50)]">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <span className="tm-eyebrow">AI Bootcamp</span>
          <h1
            className="mt-2 font-serif font-light text-[var(--charcoal-900)]"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.25rem)" }}
          >
            TalentMucho
          </h1>
        </div>

        <div className="tm-card">
          <h2 className="font-serif font-light text-2xl text-[var(--charcoal-900)] mb-1">
            Welcome back
          </h2>
          <p className="tm-body-sm mb-6">Sign in to your account</p>

          <form action={formAction} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-[var(--espresso-800)]">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-lg border border-[var(--beige-200)] bg-white text-sm text-[var(--charcoal-900)] placeholder:text-[var(--taupe-400)] focus:outline-none focus:ring-2 focus:ring-[var(--clay-500)] focus:border-transparent transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-[var(--espresso-800)]">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-[var(--clay-500)] hover:text-[var(--clay-600)] transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-10 rounded-lg border border-[var(--beige-200)] bg-white text-sm text-[var(--charcoal-900)] placeholder:text-[var(--taupe-400)] focus:outline-none focus:ring-2 focus:ring-[var(--clay-500)] focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--taupe-400)] hover:text-[var(--charcoal-900)] transition-colors"
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="tm-btn-primary w-full mt-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none"
            >
              {isPending ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <p className="text-center text-sm text-[var(--taupe-400)] mt-6">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-[var(--clay-500)] font-medium hover:text-[var(--clay-600)] transition-colors"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
