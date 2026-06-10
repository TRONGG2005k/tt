import axios from "axios";

import type { ApiErrorResponse } from "@/lib/api-types";

export function getApiErrorMessage(
  error: unknown,
  fallbackMessage = "Something went wrong.",
): string {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    const responseData = error.response?.data;
    const responseMessage =
      responseData?.error?.message ?? responseData?.message;

    if (typeof responseMessage === "string" && responseMessage.trim().length > 0) {
      return responseMessage;
    }

    if (typeof error.message === "string" && error.message.trim().length > 0) {
      return error.message;
    }
  }

  if (error instanceof Error && error.message.trim().length > 0) {
    return error.message;
  }

  return fallbackMessage;
}
