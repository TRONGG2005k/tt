"use client";

import { startTransition, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import AppIcon from "@/components/AppIcon";
import Sidebar from "@/components/Sidebar";
import apiClient from "@/lib/api-client";
import { clearAccessToken } from "@/lib/auth-token";
import { getApiErrorMessage } from "@/lib/api-error";
import type {
  ApiSuccessResponse,
  GoogleConnectResponseData,
} from "@/lib/api-types";

type AppLayoutProps = {
  children: React.ReactNode;
};

const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/profile": "Profile",
};

const PAGE_DESCRIPTIONS: Record<string, string> = {
  "/dashboard": "Track hiring activity and key recruitment metrics.",
  "/profile": "Review the current signed-in user information.",
};

export default function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isConnectingGoogle, setIsConnectingGoogle] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [googleConnectError, setGoogleConnectError] = useState<string | null>(null);

  const pageTitle = useMemo(() => PAGE_TITLES[pathname] ?? "Workspace", [pathname]);
  const pageDescription = useMemo(
    () => PAGE_DESCRIPTIONS[pathname] ?? "Manage your recruitment workflow.",
    [pathname],
  );

  async function handleConnectGoogle() {
    if (isConnectingGoogle) {
      return;
    }

    setIsConnectingGoogle(true);
    setGoogleConnectError(null);

    try {
      const response =
        await apiClient.get<ApiSuccessResponse<GoogleConnectResponseData>>(
          "/auth/google/connect",
        );
      const authUrl = response.data.data.auth_url;

      if (!authUrl) {
        throw new Error("Google authorization URL is missing.");
      }

      window.location.assign(authUrl);
    } catch (error) {
      setGoogleConnectError(
        getApiErrorMessage(
          error,
          "Unable to start Gmail connection right now. Please try again.",
        ),
      );
      setIsConnectingGoogle(false);
    }
  }

  async function handleLogout() {
    if (isLoggingOut) {
      return;
    }

    setGoogleConnectError(null);
    setIsLoggingOut(true);

    try {
      await apiClient.post("/auth/logout", undefined, {
        skipAuthRefresh: true,
      });
    } catch {
      // Keep logout resilient even when the token is already invalid.
    } finally {
      clearAccessToken();
      startTransition(() => {
        router.replace("/login");
      });
      setIsLoggingOut(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f8f7ff] text-[#111827]">
      <div className="min-h-screen md:flex">
        <Sidebar />

        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 border-b border-[#e8eaf3] bg-white/95 backdrop-blur">
            <div className="flex min-h-20 flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
              <label className="flex h-11 w-full max-w-xl items-center gap-3 rounded-xl bg-[#f2f4fd] px-4 text-slate-500">
                <AppIcon name="search" className="h-5 w-5" />
                <input
                  type="search"
                  aria-label="Search workspace"
                  placeholder="Search candidates, jobs, or profiles..."
                  className="min-w-0 flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-500"
                />
              </label>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={handleConnectGoogle}
                  disabled={isConnectingGoogle || isLoggingOut}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#0b4dcc] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#083fa8] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <AppIcon name="gmail" className="h-4 w-4" />
                  {isConnectingGoogle ? "Connecting Gmail..." : "Connect Gmail"}
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={isLoggingOut || isConnectingGoogle}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-[#d8deee] bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-[#b8c5e7] hover:bg-[#f7f8fd] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <AppIcon name="logout" className="h-4 w-4" />
                  {isLoggingOut ? "Signing out..." : "Logout"}
                </button>

                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d8deee] bg-[#eef2ff] text-sm font-bold text-[#0b4dcc]">
                  T
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 px-4 py-7 sm:px-6 lg:px-8 lg:py-9">
            <div className="mx-auto w-full max-w-[1240px]">
              <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-[#0b4dcc]">
                    Recruitment workspace
                  </p>
                  <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#0b1328]">
                    {pageTitle}
                  </h1>
                  <p className="mt-1 text-sm text-slate-600">{pageDescription}</p>
                </div>
                <span className="inline-flex w-fit rounded-full bg-[#e3e9ff] px-4 py-2 text-xs font-semibold text-[#0b4dcc]">
                  Workspace: TTN Recruitment
                </span>
              </div>

              {googleConnectError ? (
                <p className="mb-5 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                  {googleConnectError}
                </p>
              ) : null}

              {children}
            </div>
          </main>

          <footer className="border-t border-[#dfe3f0] bg-white px-4 py-5 sm:px-6 lg:px-8">
            <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-2 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
              <span className="font-semibold text-[#0b4dcc]">
                TTN Recruitment Workspace
              </span>
              <span>Status: Operational</span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
