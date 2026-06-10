"use client";

import { useEffect, useState } from "react";

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
      <section className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-xl shadow-slate-200/70">
        <div className="space-y-3">
          <div className="h-5 w-36 animate-pulse rounded-full bg-slate-200" />
          <div className="h-4 w-56 animate-pulse rounded-full bg-slate-100" />
          <div className="grid gap-4 pt-3 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-24 animate-pulse rounded-3xl border border-slate-100 bg-slate-50"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (state.status === "error") {
    return (
      <section className="rounded-[2rem] border border-rose-200 bg-rose-50 p-6 shadow-lg shadow-rose-100/80">
        <p className="text-sm font-semibold text-rose-700">Unable to load profile</p>
        <p className="mt-2 text-sm text-rose-600">{state.message}</p>
      </section>
    );
  }

  const { user } = state;

  return (
    <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
      <div className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-xl shadow-slate-200/70">
        <div className="flex flex-col gap-4 border-b border-slate-100 pb-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
              Account
            </div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
              {user.full_name || "Current user"}
            </h2>
            <p className="mt-1 text-sm text-slate-600">{user.email}</p>
          </div>

          <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            {user.status}
          </span>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <article className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              User ID
            </p>
            <p className="mt-3 break-all text-sm text-slate-700">{user.id}</p>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Roles
            </p>
            <p className="mt-3 text-sm text-slate-700">
              {user.roles.length > 0 ? user.roles.join(", ") : "No roles assigned"}
            </p>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Created at
            </p>
            <p className="mt-3 text-sm text-slate-700">
              {formatDateTime(user.created_at)}
            </p>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Updated at
            </p>
            <p className="mt-3 text-sm text-slate-700">
              {formatDateTime(user.updated_at)}
            </p>
          </article>
        </div>
      </div>

      <div className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-xl shadow-slate-200/70">
        <div className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-700">
          Summary
        </div>
        <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-950">
          Profile snapshot
        </h3>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          This panel uses the backend endpoint <code>/api/v1/users/me</code> and
          renders the current signed-in user returned by the API.
        </p>

        <div className="mt-6 space-y-4">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Primary email
            </p>
            <p className="mt-2 text-sm text-slate-700">{user.email}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
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
