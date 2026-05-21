import { NextRequest, NextResponse } from "next/server";
import { AppError } from "./app.exception";
import { ZodError, ZodIssue } from "zod";

/**
 * Interface cho standardized error response
 */
export interface ErrorResponse {
    success: false;
    error: {
        code: string;
        message: string;
        details?: any;
    };
}

/**
 * Xử lý lỗi và trả về response chuẩn hóa
 */
export function handleError(error: unknown): NextResponse<ErrorResponse> {
    // Xử lý AppError (custom exceptions)
    if (error instanceof AppError) {
        return NextResponse.json(
            {
                success: false,
                error: {
                    code: error.code,
                    message: error.message,
                    details: error.details,
                },
            },
            { status: error.statusCode }
        );
    }

    // Xử lý ZodError (validation errors)
    if (error instanceof ZodError) {
        const formattedErrors = formatZodError(error);
        return NextResponse.json(
            {
                success: false,
                error: {
                    code: "VALIDATION_ERROR",
                    message: "Dữ liệu đầu vào không hợp lệ",
                    details: formattedErrors,
                },
            },
            { status: 400 }
        );
    }

    // Xử lý các lỗi Error thông thường
    if (error instanceof Error) {
        console.error("Unhandled error:", error);
        return NextResponse.json(
            {
                success: false,
                error: {
                    code: "INTERNAL_ERROR",
                    message: error.message || "An unexpected error occurred",
                },
            },
            { status: 500 }
        );
    }

    // Xử lý các lỗi không xác định
    console.error("Unknown error:", error);
    return NextResponse.json(
        {
            success: false,
            error: {
                code: "INTERNAL_ERROR",
                message: "An unexpected error occurred",
            },
        },
        { status: 500 }
    );
}

/**
 * Format ZodError thành object dễ đọc
 */
function formatZodError(error: ZodError): Record<string, string[]> {
    const formatted: Record<string, string[]> = {};

    error.issues.forEach((issue: ZodIssue) => {
        const path = issue.path.join(".");
        if (!formatted[path]) {
            formatted[path] = [];
        }
        formatted[path].push(issue.message);
    });

    return formatted;
}

/**
 * Wrapper function để xử lý async route handlers
 * Usage: export const GET = withErrorHandler(async (req) => { ... })
 */
export function withErrorHandler(
    handler: (req: NextRequest, ...args: any[]) => Promise<NextResponse>
) {
    return async (
        req: NextRequest,
        ...args: any[]
    ): Promise<NextResponse> => {
        try {
            return await handler(req, ...args);
        } catch (error) {
            return handleError(error);
        }
    };
}

/**
 * Type guard để kiểm tra response có success = false
 */
export function isErrorResponse(
    response: any
): response is ErrorResponse {
    return response?.success === false;
}
