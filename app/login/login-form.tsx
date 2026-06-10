"use client";

import { startTransition, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";

import apiClient from "@/lib/api-client";
import { getApiErrorMessage } from "@/lib/api-error";
import {
  getAccessTokenSnapshot,
  getServerAccessTokenSnapshot,
  setAccessToken,
  subscribeToAccessToken,
} from "@/lib/auth-token";
import type {
  ApiSuccessResponse,
  LoginResponseData,
} from "@/lib/api-types";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const accessToken = useSyncExternalStore(
    subscribeToAccessToken,
    getAccessTokenSnapshot,
    getServerAccessTokenSnapshot,
  );
  const isLoggedIn = Boolean(accessToken);

  const canSubmit = useMemo(() => {
    return email.trim().length > 0 && password.length > 0 && !isSubmitting;
  }, [email, password, isSubmitting]);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    startTransition(() => {
      router.replace("/dashboard");
    });
  }, [isLoggedIn, router]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await apiClient.post<ApiSuccessResponse<LoginResponseData>>(
        "/auth/login",
        {
          email: email.trim(),
          password,
        },
      );

      setAccessToken(response.data.data.access_token);

      startTransition(() => {
        router.replace("/dashboard");
      });
    } catch (error) {
      setErrorMessage(
        getApiErrorMessage(error, "Unable to sign in right now. Please try again."),
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="mb-8">
        <div className="inline-flex rounded-full bg-[#e3e9ff] px-3 py-1 font-mono text-xs font-medium text-[#0b4dcc]">
          Welcome back
        </div>
        <h1 className="mt-5 text-3xl font-bold tracking-tight text-[#0b1328]">
          Sign in to your workspace
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Use your email and password to continue to the recruitment dashboard.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-semibold text-slate-800">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="h-12 w-full rounded-lg border border-[#d8deee] bg-[#fafbff] px-4 text-sm text-slate-900 outline-none transition focus:border-[#0b4dcc] focus:bg-white focus:ring-4 focus:ring-[#dce6ff]"
            placeholder="name@company.com"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-semibold text-slate-800">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="h-12 w-full rounded-lg border border-[#d8deee] bg-[#fafbff] px-4 text-sm text-slate-900 outline-none transition focus:border-[#0b4dcc] focus:bg-white focus:ring-4 focus:ring-[#dce6ff]"
            placeholder="Enter your password"
          />
        </div>

        {errorMessage ? (
          <div className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {errorMessage}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={!canSubmit}
          className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-[#0b4dcc] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#083fa8] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <div className="mt-6 rounded-lg border border-[#dfe4f2] bg-[#f7f8fd] px-4 py-3 text-xs leading-5 text-slate-600">
        Access token is stored in local storage. Refresh token stays in the
        backend cookie and is rotated automatically when needed.
      </div>
    </div>
  );
}
