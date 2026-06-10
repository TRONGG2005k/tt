"use client";

import { useEffect, useState } from "react";

import apiClient from "@/lib/api-client";
import { getAccessToken } from "@/lib/auth-token";

type UserMe = {
  id: string;
  email: string;
  full_name: string;
  is_online: boolean;
  last_seen: string | null;
  offline_minutes: number | null;
};

type MeApiResponse = {
  success: boolean;
  message: string;
  data: UserMe;
};

type LoadState =
  | { status: "idle" | "loading" }
  | { status: "loaded"; user: UserMe }
  | { status: "error"; message: string; details?: unknown };

export default function UserProfile() {
  const [state, setState] = useState<LoadState>({ status: "idle" });

  useEffect(() => {
    let cancelled = false;

    async function run() {
      if (!getAccessToken()) {
        window.location.assign("/login");
        return;
      }

      setState({ status: "loading" });
      try {
        if (cancelled) return;
        const response = await apiClient.get<MeApiResponse>("/users/me");
        setState({ status: "loaded", user: response.data.data });
      } catch (error: unknown) {
        if (cancelled) return;
        const status =
          typeof error === "object" &&
          error !== null &&
          "response" in error &&
          typeof error.response === "object" &&
          error.response !== null &&
          "status" in error.response &&
          typeof error.response.status === "number"
            ? error.response.status
            : 0;

        const details =
          typeof error === "object" &&
          error !== null &&
          "response" in error &&
          typeof error.response === "object" &&
          error.response !== null &&
          "data" in error.response
            ? error.response.data
            : undefined;

        setState({
          status: "error",
          message: status ? `Request failed (HTTP ${status})` : "Network error",
          details,
        });
      }
    }

    void run();
    return () => {
      cancelled = true;
    };
  }, []);

  if (state.status === "loading" || state.status === "idle") {
    return (
      <div className="w-full max-w-xl rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-black">
        <div className="text-sm text-zinc-600 dark:text-zinc-400">
          Đang tải thông tin người dùng...
        </div>
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="w-full max-w-xl rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-900 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-100">
        <div className="font-medium">Không tải được thông tin</div>
        <div className="mt-1">{state.message}</div>
        {state.details ? (
          <pre className="mt-3 max-h-64 overflow-auto whitespace-pre-wrap break-words rounded-xl border border-red-200/60 bg-white/40 p-3 text-xs dark:border-red-900/40 dark:bg-black/20">
            {JSON.stringify(state.details, null, 2)}
          </pre>
        ) : null}
      </div>
    );
  }

  if (state.status !== "loaded") return null;
  const u = state.user;
  return (
    <div className="w-full max-w-xl rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-black">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            Thông tin người dùng
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Dữ liệu từ `api/v1/users/me`.
          </p>
        </div>
        <span
          className={[
            "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
            u.is_online
              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-200"
              : "bg-zinc-100 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-200",
          ].join(" ")}
        >
          {u.is_online ? "Online" : "Offline"}
        </span>
      </div>

      <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
          <dt className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
            ID
          </dt>
          <dd className="mt-1 break-all text-sm text-zinc-900 dark:text-zinc-100">
            {u.id}
          </dd>
        </div>
        <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
          <dt className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
            Email
          </dt>
          <dd className="mt-1 break-all text-sm text-zinc-900 dark:text-zinc-100">
            {u.email}
          </dd>
        </div>
        <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
          <dt className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
            Full name
          </dt>
          <dd className="mt-1 text-sm text-zinc-900 dark:text-zinc-100">
            {u.full_name}
          </dd>
        </div>
        <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
          <dt className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
            Offline minutes
          </dt>
          <dd className="mt-1 text-sm text-zinc-900 dark:text-zinc-100">
            {u.offline_minutes ?? "-"}
          </dd>
        </div>
        <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800 sm:col-span-2">
          <dt className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
            Last seen
          </dt>
          <dd className="mt-1 text-sm text-zinc-900 dark:text-zinc-100">
            {u.last_seen ?? "-"}
          </dd>
        </div>
      </dl>
    </div>
  );
}
