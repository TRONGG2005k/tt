"use client";

import { startTransition, useEffect } from "react";
import { useRouter } from "next/navigation";

import { hasAccessToken } from "@/lib/auth-token";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    startTransition(() => {
      router.replace(hasAccessToken() ? "/dashboard" : "/login");
    });
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="rounded-3xl border border-slate-200 bg-white px-6 py-5 text-sm text-slate-600 shadow-lg shadow-slate-200/70">
        Redirecting...
      </div>
    </div>
  );
}
