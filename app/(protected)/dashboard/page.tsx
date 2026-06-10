import type { Metadata } from "next";

import AppIcon from "@/components/AppIcon";

export const metadata: Metadata = {
  title: "Dashboard",
};

const DASHBOARD_STATS = [
  {
    label: "Total CVs",
    value: "128",
    change: "+12 this week",
    icon: "document" as const,
  },
  {
    label: "Pending Reviews",
    value: "18",
    change: "5 high priority",
    icon: "users" as const,
  },
  {
    label: "Matched Jobs",
    value: "42",
    change: "+7 from yesterday",
    icon: "briefcase" as const,
  },
];

const PIPELINE_DATA = [
  { label: "New", value: 52, height: "h-24" },
  { label: "Screen", value: 34, height: "h-40" },
  { label: "Review", value: 18, height: "h-28" },
  { label: "Interview", value: 11, height: "h-48" },
  { label: "Offer", value: 3, height: "h-32" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-[0.8fr_0.8fr_0.8fr_1.65fr]">
        {DASHBOARD_STATS.map((stat) => (
          <article
            key={stat.label}
            className="rounded-xl border border-[#d5def7] bg-white p-5 shadow-[0_8px_28px_rgba(41,62,120,0.05)]"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#eef2ff] text-[#0b4dcc]">
                <AppIcon name={stat.icon} className="h-5 w-5" />
              </span>
              <span className="font-mono text-[11px] text-slate-600">
                {stat.change}
              </span>
            </div>
            <p className="mt-5 font-mono text-xs text-slate-600">{stat.label}</p>
            <p className="mt-1 text-3xl font-semibold tracking-tight text-[#0b1328]">
              {stat.value}
            </p>
          </article>
        ))}

        <article className="relative overflow-hidden rounded-xl border border-[#0b4dcc] bg-[#2865e8] p-6 text-white shadow-[0_12px_30px_rgba(11,77,204,0.18)] sm:col-span-2 xl:col-span-1">
          <div className="absolute -right-12 -top-16 h-44 w-44 rounded-full bg-white/10" />
          <div className="relative">
            <p className="font-mono text-xs text-blue-100">Recruitment hub</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              Hello world
            </h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-blue-50">
              This dashboard is ready for authenticated users and gives you a
              clean foundation for CV, review, and job-matching features.
            </p>
            <div className="mt-5 flex items-center gap-2 text-xs font-medium">
              <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/70">
                i
              </span>
              Authenticated workspace is active
            </div>
          </div>
        </article>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight text-[#0b1328]">
            Recruitment overview
          </h2>
          <span className="flex items-center gap-2 text-sm font-semibold text-[#0b4dcc]">
            View activity
            <AppIcon name="arrow" className="h-4 w-4" />
          </span>
        </div>

        <div className="grid gap-5 xl:grid-cols-[1.7fr_0.8fr]">
          <article className="rounded-xl border border-[#d5def7] bg-white p-6 shadow-[0_8px_28px_rgba(41,62,120,0.05)]">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-xl font-semibold tracking-tight text-[#0b1328]">
                  Pipeline snapshot
                </h3>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-600">
                  Placeholder content for the upcoming recruitment analytics.
                  Real backend metrics can be connected later without changing
                  this layout.
                </p>
              </div>
              <span className="inline-flex w-fit rounded-lg bg-[#f1f3fc] px-3 py-2 text-xs font-medium text-slate-700">
                Current pipeline
              </span>
            </div>

            <div className="mt-8 flex min-h-64 items-end gap-3 border-b border-[#e1e5f0] px-1 sm:gap-5">
              {PIPELINE_DATA.map((item, index) => (
                <div
                  key={item.label}
                  className="flex min-w-0 flex-1 flex-col items-center justify-end"
                >
                  <span className="mb-2 text-xs font-semibold text-slate-700">
                    {item.value}
                  </span>
                  <div
                    className={[
                      "w-full max-w-20 rounded-t-lg",
                      item.height,
                      index === PIPELINE_DATA.length - 1
                        ? "bg-[#2865e8]"
                        : "bg-[#cddafb]",
                    ].join(" ")}
                  />
                  <span
                    className={[
                      "mt-3 truncate text-[11px]",
                      index === PIPELINE_DATA.length - 1
                        ? "font-semibold text-[#0b4dcc]"
                        : "text-slate-500",
                    ].join(" ")}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-xl border border-[#d5def7] bg-white p-6 shadow-[0_8px_28px_rgba(41,62,120,0.05)]">
            <h3 className="text-xl font-semibold tracking-tight text-[#0b1328]">
              Team notes
            </h3>
            <ul className="mt-6 space-y-5">
              <li className="flex gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#dbe7ff] text-[#0b4dcc]">
                  <AppIcon name="document" className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    CV metrics
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    CV processing cards are placeholders for now.
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#e2e6ff] text-[#304fc7]">
                  <AppIcon name="profile" className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Protected access
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Protected routing is active for this page.
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#ffe2d7] text-[#b94b22]">
                  <AppIcon name="trend" className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Shared API client
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Authenticated API calls reuse one shared axios instance.
                  </p>
                </div>
              </li>
            </ul>

            <blockquote className="mt-7 rounded-lg border border-dashed border-[#bfc9e5] bg-[#f8f9ff] px-4 py-5 text-center text-xs italic leading-5 text-slate-600">
              A clearer pipeline makes every hiring decision easier to see.
            </blockquote>
          </article>
        </div>
      </section>
    </div>
  );
}
