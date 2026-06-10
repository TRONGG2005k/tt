import type { Metadata } from "next";

import LoginForm from "./login-form";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(79,70,229,0.16),transparent_28%)]" />
      <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-indigo-100/70 via-sky-50/50 to-transparent" />

      <div className="relative w-full max-w-5xl">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="hidden rounded-[2rem] border border-white/70 bg-slate-950 px-8 py-10 text-white shadow-2xl shadow-indigo-950/20 lg:block">
            <div className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-100">
              TTN Recruitment
            </div>
            <h1 className="mt-6 max-w-md text-4xl font-semibold tracking-tight">
              Recruit smarter with a cleaner hiring workspace.
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-slate-300">
              Secure sign-in, a focused dashboard, and a profile view built for
              the recruitment workflow your team is already using.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-2xl font-semibold">24</div>
                <div className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-300">
                  Active CVs
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-2xl font-semibold">12</div>
                <div className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-300">
                  Open reviews
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-2xl font-semibold">8</div>
                <div className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-300">
                  Matched jobs
                </div>
              </div>
            </div>
          </div>

          <LoginForm />
        </div>
      </div>
    </div>
  );
}
