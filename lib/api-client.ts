import axios, {
  AxiosError,
  AxiosHeaders,
  type InternalAxiosRequestConfig,
} from "axios";

import {
  clearSessionAndRedirect,
  getAccessToken,
  setAccessToken,
} from "@/lib/auth-token";
import type {
  ApiSuccessResponse,
  RefreshResponseData,
} from "@/lib/api-types";

declare module "axios" {
  interface AxiosRequestConfig {
    skipAuthRefresh?: boolean;
  }

  interface InternalAxiosRequestConfig {
    skipAuthRefresh?: boolean;
    _retry?: boolean;
  }
}

const AUTH_LOGIN_PATH = "/auth/login";
const AUTH_REFRESH_PATH = "/auth/refresh";
const AUTH_EXCLUDED_PATHS = [AUTH_LOGIN_PATH, AUTH_REFRESH_PATH];
const apiBaseURL = (process.env.NEXT_PUBLIC_API_BASE_URL || "/api/v1").replace(
  /\/+$/,
  "",
);

let refreshRequestPromise: Promise<string> | null = null;

const apiClient = axios.create({
  baseURL: apiBaseURL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});

const refreshClient = axios.create({
  baseURL: apiBaseURL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});

function isExcludedAuthRequest(url?: string): boolean {
  if (!url) {
    return false;
  }

  return AUTH_EXCLUDED_PATHS.some((path) => url.includes(path));
}

async function refreshAccessToken(): Promise<string> {
  if (!refreshRequestPromise) {
    refreshRequestPromise = refreshClient
      .post<ApiSuccessResponse<RefreshResponseData>>(AUTH_REFRESH_PATH)
      .then((response) => {
        const nextAccessToken = response.data.data.access_token;

        setAccessToken(nextAccessToken);
        return nextAccessToken;
      })
      .finally(() => {
        refreshRequestPromise = null;
      });
  }

  return refreshRequestPromise;
}

apiClient.interceptors.request.use((config) => {
  const accessToken = getAccessToken();
  const headers = AxiosHeaders.from(config.headers);

  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  } else {
    headers.delete("Authorization");
  }

  config.headers = headers;
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig | undefined;
    const statusCode = error.response?.status;

    if (!originalRequest || statusCode !== 401) {
      return Promise.reject(error);
    }

    if (
      originalRequest._retry ||
      originalRequest.skipAuthRefresh ||
      isExcludedAuthRequest(originalRequest.url)
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const nextAccessToken = await refreshAccessToken();
      const headers = AxiosHeaders.from(originalRequest.headers);

      headers.set("Authorization", `Bearer ${nextAccessToken}`);
      originalRequest.headers = headers;

      return apiClient(originalRequest);
    } catch (refreshError) {
      clearSessionAndRedirect();
      return Promise.reject(refreshError);
    }
  },
);

export default apiClient;
