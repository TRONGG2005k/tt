"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import AppIcon from "@/components/AppIcon";

const NAV_ITEMS = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: "dashboard" as const,
  },
  {
    href: "/profile",
    label: "Profile",
    icon: "profile" as const,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full shrink-0 border-b border-[#dfe5f5] bg-[#fbfaff] md:sticky md:top-0 md:h-screen md:w-[252px] md:border-b-0 md:border-r">
      <div className="flex h-full flex-col">
        <div className="px-6 pb-7 pt-7">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0b4dcc] text-base font-bold text-white shadow-sm">
              T
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight text-[#0b4dcc]">
                TTN Recruit
              </h2>
              <p className="text-xs text-slate-600">Hiring Workspace</p>
            </div>
          </div>
        </div>

        <nav className="flex gap-2 overflow-x-auto px-3 pb-4 md:flex-1 md:flex-col md:overflow-visible md:px-2 md:py-5">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "relative flex min-w-36 items-center gap-3 rounded-lg px-4 py-3 text-sm transition md:min-w-0",
                  isActive
                    ? "bg-[#e3e9ff] font-semibold text-[#0847c7]"
                    : "text-slate-700 hover:bg-[#f0f2fb] hover:text-[#0847c7]",
                ].join(" ")}
              >
                {isActive ? (
                  <span className="absolute inset-y-2 left-0 w-1 rounded-r-full bg-[#0b4dcc]" />
                ) : null}
                <AppIcon name={item.icon} className="h-5 w-5 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="hidden border-t border-[#d8deee] p-6 md:block">
          <div className="rounded-xl border border-[#d6def5] bg-white p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#e3e9ff] text-[#0b4dcc]">
                <AppIcon name="sparkles" className="h-4 w-4" />
              </span>
              Recruitment Hub
            </div>
            <p className="mt-2 text-xs leading-5 text-slate-500">
              Keep your candidate workflow organized in one place.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
