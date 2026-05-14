"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { forgotPassword } from "@/app/actions/auth";
import { toast } from "sonner";

const initialState = { error: null };

export default function ForgotPasswordPage() {
  const [state, formAction, isPending] = useActionState(forgotPassword, initialState);

  useEffect(() => {
    if (state?.error) toast.error("Request failed", { description: state.error });
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
          {state?.success ? (
            <div className="text-center py-4">
              <h2 className="font-serif font-light text-2xl text-[var(--charcoal-900)] mb-3">
                Check your email
              </h2>
              <p className="tm-body-sm mb-6">
                We sent a password reset link to your email address.
              </p>
              <Link
                href="/login"
                className="text-[var(--clay-500)] font-medium hover:text-[var(--clay-600)] transition-colors text-sm"
              >
                Back to sign in
              </Link>
            </div>
          ) : (
            <>
              <h2 className="font-serif font-light text-2xl text-[var(--charcoal-900)] mb-1">
                Reset your password
              </h2>
              <p className="tm-body-sm mb-6">
                Enter your email and we&apos;ll send you a reset link.
              </p>

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

                <button
                  type="submit"
                  disabled={isPending}
                  className="tm-btn-primary w-full mt-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none"
                >
                  {isPending ? "Sending…" : "Send reset link"}
                </button>
              </form>

              <p className="text-center text-sm text-[var(--taupe-400)] mt-6">
                Remember your password?{" "}
                <Link
                  href="/login"
                  className="text-[var(--clay-500)] font-medium hover:text-[var(--clay-600)] transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
