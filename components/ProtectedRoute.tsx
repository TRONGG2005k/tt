"use client";

import { startTransition, useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";

import {
  getAccessTokenSnapshot,
  getServerAccessTokenSnapshot,
  subscribeToAccessToken,
} from "@/lib/auth-token";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const accessToken = useSyncExternalStore(
    subscribeToAccessToken,
    getAccessTokenSnapshot,
    getServerAccessTokenSnapshot,
  );

  useEffect(() => {
    if (accessToken) {
      return;
    }

    startTransition(() => {
      router.replace("/login");
    });
  }, [accessToken, router]);

  if (!accessToken) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6">
        <div className="rounded-3xl border border-slate-200 bg-white px-6 py-5 text-sm text-slate-600 shadow-lg shadow-slate-200/70">
          Checking your session...
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
