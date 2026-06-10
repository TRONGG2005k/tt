"use client";

import { startTransition, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UserPage() {
  const router = useRouter();

  useEffect(() => {
    startTransition(() => {
      router.replace("/profile");
    });
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="rounded-3xl border border-slate-200 bg-white px-6 py-5 text-sm text-slate-600 shadow-lg shadow-slate-200/70">
        Redirecting to profile...
      </div>
    </div>
  );
}
