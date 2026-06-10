"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  {
    href: "/dashboard",
    label: "Dashboard",
    description: "Overview",
  },
  {
    href: "/profile",
    label: "Profile",
    description: "My account",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full border-b border-slate-200/80 bg-slate-950 text-slate-100 md:min-h-screen md:w-72 md:border-b-0 md:border-r">
      <div className="flex h-full flex-col">
        <div className="border-b border-white/10 px-5 py-6">
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-500 text-lg font-semibold text-white shadow-lg shadow-indigo-950/40">
            T
          </div>
          <h2 className="mt-4 text-lg font-semibold tracking-tight">
            TTN Recruitment
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Hiring operations workspace
          </p>
        </div>

        <nav className="flex gap-3 overflow-x-auto px-4 py-4 md:flex-1 md:flex-col md:overflow-visible md:px-4 md:py-6">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "min-w-40 rounded-2xl border px-4 py-3 transition md:min-w-0",
                  isActive
                    ? "border-sky-400/50 bg-sky-500/15 text-white shadow-lg shadow-sky-950/20"
                    : "border-transparent bg-white/5 text-slate-300 hover:border-white/10 hover:bg-white/8 hover:text-white",
                ].join(" ")}
              >
                <div className="text-sm font-semibold">{item.label}</div>
                <div className="mt-1 text-xs text-slate-400">{item.description}</div>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
