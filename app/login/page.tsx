import type { Metadata } from "next";

import LoginForm from "./login-form";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#f8f7ff] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto grid min-h-[calc(100vh-2rem)] w-full max-w-6xl overflow-hidden rounded-2xl border border-[#dce2f2] bg-white shadow-[0_24px_70px_rgba(34,53,110,0.12)] sm:min-h-[calc(100vh-3rem)] lg:grid-cols-[1fr_0.88fr]">
        <div className="relative hidden overflow-hidden bg-[#f3f5ff] p-10 lg:flex lg:flex-col lg:justify-between">
          <div className="absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-[#dbe5ff]" />
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full border-[42px] border-[#e1e8ff]" />

          <div className="relative">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0b4dcc] text-lg font-bold text-white">
                T
              </div>
              <div>
                <div className="text-xl font-bold text-[#0b4dcc]">TTN Recruit</div>
                <div className="text-xs text-slate-600">Hiring Workspace</div>
              </div>
            </div>

            <div className="mt-24 max-w-lg">
              <div className="inline-flex rounded-full bg-[#e3e9ff] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#0b4dcc]">
              TTN Recruitment
              </div>
              <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-[#0b1328]">
                Recruit smarter with a clearer hiring workspace.
              </h1>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Secure sign-in, focused candidate tracking, and a consistent
                workspace for your recruitment team.
              </p>
            </div>
          </div>

          <div className="relative grid grid-cols-3 gap-3">
              <div className="rounded-xl border border-[#d5def7] bg-white p-4">
                <div className="text-2xl font-semibold text-[#0b1328]">24</div>
                <div className="mt-1 font-mono text-[10px] uppercase text-slate-500">
                  Active CVs
                </div>
              </div>
              <div className="rounded-xl border border-[#d5def7] bg-white p-4">
                <div className="text-2xl font-semibold text-[#0b1328]">12</div>
                <div className="mt-1 font-mono text-[10px] uppercase text-slate-500">
                  Open reviews
                </div>
              </div>
              <div className="rounded-xl border border-[#d5def7] bg-white p-4">
                <div className="text-2xl font-semibold text-[#0b1328]">8</div>
                <div className="mt-1 font-mono text-[10px] uppercase text-slate-500">
                  Matched jobs
                </div>
              </div>
          </div>
        </div>

        <div className="flex items-center justify-center p-5 sm:p-10 lg:p-14">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
