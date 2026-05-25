"use client";

import { useMemo, useState } from "react";

import { TT_API_BASE_URL } from "@/app/lib/tt-api";

type ApiResult =
  | { ok: true; data: unknown }
  | { ok: false; status: number; data: unknown };

const AUTH_LOGIN_URL = `${TT_API_BASE_URL}/api/v1/auth/login`;
const AUTH_REFRESH_URL = `${TT_API_BASE_URL}/api/v1/auth/refresh`;
const GOOGLE_CONNECT_URL = `${TT_API_BASE_URL}/api/v1/google/connect`;

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginResult, setLoginResult] = useState<ApiResult | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshResult, setRefreshResult] = useState<ApiResult | null>(null);

  const canSubmit = useMemo(() => {
    return email.trim().length > 0 && password.length > 0 && !isSubmitting;
  }, [email, password, isSubmitting]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit) return;

    setIsSubmitting(true);
    setLoginResult(null);
    setIsLoggedIn(false);
    setRefreshResult(null);
    try {
      const res = await fetch(AUTH_LOGIN_URL, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data: unknown = await res.json().catch(() => null);
      if (res.ok) {
        setLoginResult({ ok: true, data });
        setIsLoggedIn(true);
      } else {
        setLoginResult({ ok: false, status: res.status, data });
      }
    } catch {
      setLoginResult({ ok: false, status: 0, data: { error: "NETWORK_ERROR" } });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function onRefresh() {
    if (!isLoggedIn || isRefreshing) return;
    setIsRefreshing(true);
    setRefreshResult(null);
    try {
      const res = await fetch(AUTH_REFRESH_URL, {
        method: "POST",
        headers: { accept: "application/json" },
        credentials: "include",
      });

      const data: unknown = await res.json().catch(() => null);
      if (res.ok) setRefreshResult({ ok: true, data });
      else setRefreshResult({ ok: false, status: res.status, data });
    } catch {
      setRefreshResult({
        ok: false,
        status: 0,
        data: { error: "NETWORK_ERROR" },
      });
    } finally {
      setIsRefreshing(false);
    }
  }

  return (
    <div className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-black">
      <div className="mb-6">
        <h1 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          Đăng nhập
        </h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Nhập email và password để tiếp tục.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label
            htmlFor="email"
            className="text-sm font-medium text-zinc-800 dark:text-zinc-200"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900 outline-none ring-0 placeholder:text-zinc-400 focus:border-zinc-300 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-800 dark:bg-black dark:text-zinc-100 dark:focus:border-zinc-700 dark:focus:ring-zinc-800"
            placeholder="vd: test1@example.com"
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="password"
            className="text-sm font-medium text-zinc-800 dark:text-zinc-200"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900 outline-none ring-0 placeholder:text-zinc-400 focus:border-zinc-300 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-800 dark:bg-black dark:text-zinc-100 dark:focus:border-zinc-700 dark:focus:ring-zinc-800"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={!canSubmit}
          className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-zinc-900 px-4 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-300 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white dark:disabled:bg-zinc-700 dark:disabled:text-zinc-300"
        >
          {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
      </form>

      {isLoggedIn ? (
        <div className="mt-4 space-y-3">
          <button
            type="button"
            onClick={() => window.location.assign(GOOGLE_CONNECT_URL)}
            className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-zinc-900 px-4 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
          >
            Connect Gmail
          </button>

          <button
            type="button"
            onClick={onRefresh}
            disabled={isRefreshing}
            className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-800 dark:bg-black dark:text-zinc-100 dark:hover:bg-zinc-950"
          >
            {isRefreshing ? "Đang refresh..." : "Refresh token"}
          </button>
        </div>
      ) : null}

      {loginResult ? (
        <div className="mt-5 rounded-xl border border-zinc-200 bg-zinc-50 p-3 text-xs text-zinc-800 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200">
          <div className="mb-2 font-medium">
            {loginResult.ok
              ? "Đăng nhập thành công"
              : `Đăng nhập thất bại (HTTP ${loginResult.status})`}
          </div>
          <pre className="max-h-56 overflow-auto whitespace-pre-wrap break-words">
            {JSON.stringify(loginResult.data, null, 2)}
          </pre>
        </div>
      ) : null}

      {refreshResult ? (
        <div className="mt-3 rounded-xl border border-zinc-200 bg-zinc-50 p-3 text-xs text-zinc-800 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200">
          <div className="mb-2 font-medium">
            {refreshResult.ok
              ? "Refresh thành công"
              : `Refresh thất bại (HTTP ${refreshResult.status})`}
          </div>
          <pre className="max-h-56 overflow-auto whitespace-pre-wrap break-words">
            {JSON.stringify(refreshResult.data, null, 2)}
          </pre>
        </div>
      ) : null}
    </div>
  );
}

