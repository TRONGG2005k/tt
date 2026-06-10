"use client";

import { useEffect, useState } from "react";

import AppIcon from "@/components/AppIcon";
import apiClient from "@/lib/api-client";
import { getApiErrorMessage } from "@/lib/api-error";
import type {
  ApiSuccessResponse,
  UserProfile,
} from "@/lib/api-types";

type ProfileState =
  | { status: "loading" }
  | { status: "loaded"; user: UserProfile }
  | { status: "error"; message: string };

function formatDateTime(value: string): string {
  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return value;
  }

  return parsedDate.toLocaleString();
}

export default function ProfilePanel() {
  const [state, setState] = useState<ProfileState>({ status: "loading" });

  useEffect(() => {
    let isCancelled = false;

    async function loadProfile() {
      try {
        const response =
          await apiClient.get<ApiSuccessResponse<UserProfile>>("/users/me");

        if (!isCancelled) {
          setState({ status: "loaded", user: response.data.data });
        }
      } catch (error) {
        if (!isCancelled) {
          setState({
            status: "error",
            message: getApiErrorMessage(
              error,
              "Unable to load your profile right now.",
            ),
          });
        }
      }
    }

    void loadProfile();

    return () => {
      isCancelled = true;
    };
  }, []);

  if (state.status === "loading") {
    return (
      <section className="rounded-xl border border-[#d5def7] bg-white p-6 shadow-[0_8px_28px_rgba(41,62,120,0.05)]">
        <div className="space-y-3">
          <div className="h-5 w-36 animate-pulse rounded bg-[#dbe3f8]" />
          <div className="h-4 w-56 animate-pulse rounded bg-[#eef1fa]" />
          <div className="grid gap-4 pt-3 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-24 animate-pulse rounded-lg border border-[#e1e6f5] bg-[#f7f8fd]"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (state.status === "error") {
    return (
      <section className="rounded-xl border border-rose-200 bg-rose-50 p-6">
        <p className="text-sm font-semibold text-rose-700">Unable to load profile</p>
        <p className="mt-2 text-sm text-rose-600">{state.message}</p>
      </section>
    );
  }

  const { user } = state;
  const initials = (user.full_name || user.email)
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <section className="grid gap-5 xl:grid-cols-[1.55fr_0.75fr]">
      <div className="rounded-xl border border-[#d5def7] bg-white shadow-[0_8px_28px_rgba(41,62,120,0.05)]">
        <div className="flex flex-col gap-5 border-b border-[#e6e9f3] p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#0b4dcc] text-xl font-bold text-white">
              {initials}
            </div>
            <div>
              <div className="font-mono text-xs text-[#0b4dcc]">Account profile</div>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight text-[#0b1328]">
                {user.full_name || "Current user"}
              </h2>
              <p className="mt-1 text-sm text-slate-600">{user.email}</p>
            </div>
          </div>

          <span className="inline-flex w-fit rounded-full bg-emerald-50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700">
            {user.status}
          </span>
        </div>

        <div className="grid gap-4 p-6 md:grid-cols-2">
          <article className="rounded-lg border border-[#e0e5f3] bg-[#fafbff] p-5">
            <p className="font-mono text-xs text-slate-500">
              User ID
            </p>
            <p className="mt-3 break-all text-sm text-slate-700">{user.id}</p>
          </article>

          <article className="rounded-lg border border-[#e0e5f3] bg-[#fafbff] p-5">
            <p className="font-mono text-xs text-slate-500">
              Roles
            </p>
            <p className="mt-3 text-sm text-slate-700">
              {user.roles.length > 0 ? user.roles.join(", ") : "No roles assigned"}
            </p>
          </article>

          <article className="rounded-lg border border-[#e0e5f3] bg-[#fafbff] p-5">
            <p className="font-mono text-xs text-slate-500">
              Created at
            </p>
            <p className="mt-3 text-sm text-slate-700">
              {formatDateTime(user.created_at)}
            </p>
          </article>

          <article className="rounded-lg border border-[#e0e5f3] bg-[#fafbff] p-5">
            <p className="font-mono text-xs text-slate-500">
              Updated at
            </p>
            <p className="mt-3 text-sm text-slate-700">
              {formatDateTime(user.updated_at)}
            </p>
          </article>
        </div>
      </div>

      <div className="rounded-xl border border-[#d5def7] bg-white p-6 shadow-[0_8px_28px_rgba(41,62,120,0.05)]">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#e3e9ff] text-[#0b4dcc]">
          <AppIcon name="profile" className="h-6 w-6" />
        </div>
        <div className="mt-5 font-mono text-xs text-[#0b4dcc]">Summary</div>
        <h3 className="mt-2 text-xl font-semibold tracking-tight text-[#0b1328]">
          Profile snapshot
        </h3>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          This panel uses the backend endpoint <code>/api/v1/users/me</code> and
          renders the current signed-in user returned by the API.
        </p>

        <div className="mt-6 space-y-4">
          <div className="rounded-lg border border-[#e0e5f3] bg-[#fafbff] p-4">
            <p className="font-mono text-xs text-slate-500">
              Primary email
            </p>
            <p className="mt-2 text-sm text-slate-700">{user.email}</p>
          </div>
          <div className="rounded-lg border border-[#e0e5f3] bg-[#fafbff] p-4">
            <p className="font-mono text-xs text-slate-500">
              Display name
            </p>
            <p className="mt-2 text-sm text-slate-700">
              {user.full_name || "No full name available"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
