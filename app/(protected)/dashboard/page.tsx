import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

const DASHBOARD_STATS = [
  {
    label: "Total CVs",
    value: "128",
    change: "+12 this week",
  },
  {
    label: "Pending Reviews",
    value: "18",
    change: "5 high priority",
  },
  {
    label: "Matched Jobs",
    value: "42",
    change: "+7 from yesterday",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-slate-950 p-6 text-white shadow-2xl shadow-slate-300/40">
        <div className="max-w-3xl">
          <div className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-100">
            Recruitment hub
          </div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight">
            Hello world
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            This dashboard is ready for authenticated users and gives you a clean
            foundation for CV, review, and job-matching features.
          </p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {DASHBOARD_STATS.map((stat) => (
          <article
            key={stat.label}
            className="rounded-[1.75rem] border border-slate-200/80 bg-white/90 p-5 shadow-lg shadow-slate-200/70"
          >
            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
            <p className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">
              {stat.value}
            </p>
            <p className="mt-2 text-sm text-sky-700">{stat.change}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <article className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-lg shadow-slate-200/70">
          <h3 className="text-lg font-semibold tracking-tight text-slate-950">
            Pipeline snapshot
          </h3>
          <p className="mt-2 text-sm leading-7 text-slate-600">
            Placeholder content for the upcoming recruitment analytics. You can
            wire this card to real backend metrics later without changing the
            layout structure.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-3xl bg-slate-50 p-4">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Screening
              </div>
              <div className="mt-3 text-2xl font-semibold text-slate-950">34</div>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Interview
              </div>
              <div className="mt-3 text-2xl font-semibold text-slate-950">11</div>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Offer
              </div>
              <div className="mt-3 text-2xl font-semibold text-slate-950">3</div>
            </div>
          </div>
        </article>

        <article className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-lg shadow-slate-200/70">
          <h3 className="text-lg font-semibold tracking-tight text-slate-950">
            Team notes
          </h3>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
            <li className="rounded-2xl bg-slate-50 px-4 py-3">
              CV processing cards are placeholders for now.
            </li>
            <li className="rounded-2xl bg-slate-50 px-4 py-3">
              Protected routing is active for this page.
            </li>
            <li className="rounded-2xl bg-slate-50 px-4 py-3">
              Authenticated API calls now reuse one shared axios instance.
            </li>
          </ul>
        </article>
      </section>
    </div>
  );
}
