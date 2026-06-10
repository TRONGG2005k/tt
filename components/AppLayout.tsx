"use client";

import { startTransition, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

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
    <div className="min-h-screen bg-transparent text-slate-900">
      <div className="min-h-screen md:flex">
        <Sidebar />

        <div className="flex min-h-screen flex-1 flex-col">
          <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/80 backdrop-blur">
            <div className="flex flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
                  Workspace
                </p>
                <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">
                  {pageTitle}
                </h1>
                <p className="mt-1 text-sm text-slate-600">{pageDescription}</p>
                {googleConnectError ? (
                  <p className="mt-3 rounded-2xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
                    {googleConnectError}
                  </p>
                ) : null}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handleConnectGoogle}
                  disabled={isConnectingGoogle || isLoggingOut}
                  className="inline-flex h-11 items-center justify-center rounded-2xl bg-gradient-to-r from-sky-600 to-indigo-600 px-4 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:from-sky-500 hover:to-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isConnectingGoogle ? "Connecting Gmail..." : "Connect Gmail"}
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={isLoggingOut || isConnectingGoogle}
                  className="inline-flex h-11 items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoggingOut ? "Signing out..." : "Logout"}
                </button>
              </div>
            </div>
          </header>

          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
