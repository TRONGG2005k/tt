import { ZodSchema, ZodError } from "zod";
import { NextRequest } from "next/server";
import { AppError } from "./app.exception";

/**
 * Interface cho kết quả validate
 */
export interface ValidationResult<T> {
    success: boolean;
    data?: T;
    errors?: Record<string, string[]>;
}

/**
 * Validate dữ liệu với Zod schema
 * Trả về object có cấu trúc { success, data | errors }
 */
export function validateData<T>(
    schema: ZodSchema<T>,
    data: unknown
): ValidationResult<T> {
    const result = schema.safeParse(data);

    if (result.success) {
        return {
            success: true,
            data: result.data,
        };
    } else {
        const errors: Record<string, string[]> = {};
        result.error.issues.forEach((issue) => {
            const path = issue.path.join(".");
            if (!errors[path]) {
                errors[path] = [];
            }
            errors[path].push(issue.message);
        });

        return {
            success: false,
            errors,
        };
    }
}

/**
 * Validate dữ liệu và throw AppError nếu không hợp lệ
 */
export function validateAndThrow<T>(
    schema: ZodSchema<T>,
    data: unknown,
    errorMessage?: string
): T {
    const result = schema.safeParse(data);

    if (!result.success) {
        const errors: Record<string, string[]> = {};
        result.error.issues.forEach((issue) => {
            const path = issue.path.join(".");
            if (!errors[path]) {
                errors[path] = [];
            }
            errors[path].push(issue.message);
        });

        throw new AppError("VALIDATION_ERROR", {
            message: errorMessage || "Validation failed",
            errors,
        });
    }

    return result.data;
}

/**
 * Validate JSON body từ request
 */
export async function validateRequestBody<T>(
    request: NextRequest,
    schema: ZodSchema<T>
): Promise<T> {
    try {
        const body = await request.json();
        return validateAndThrow(schema, body, "Invalid request body");
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }
        // Không parse được JSON
        throw new AppError("BAD_REQUEST", "Invalid JSON in request body");
    }
}

/**
 * Validate query parameters từ request
 */
export function validateQueryParams<T>(
    searchParams: URLSearchParams,
    schema: ZodSchema<T>
): T {
    // Chuyển URLSearchParams thành object
    const params: Record<string, unknown> = {};
    searchParams.forEach((value, key) => {
        // Xử lý các trường hợp đặc biệt
        if (value === "true") {
            params[key] = true;
        } else if (value === "false") {
            params[key] = false;
        } else if (!isNaN(Number(value)) && value !== "") {
            params[key] = Number(value);
        } else {
            params[key] = value;
        }
    });

    return validateAndThrow(schema, params, "Invalid query parameters");
}

/**
 * Validate route params
 */
export function validateRouteParams<T>(
    params: Record<string, string>,
    schema: ZodSchema<T>
): T {
    return validateAndThrow(schema, params, "Invalid route parameters");
}

/**
 * Tạo Zod schema cho common patterns
 */
export const commonSchemas = {
    /**
     * UUID validation
     */
    uuid: () => {
        return {
            refine: (val: string) => {
                const uuidRegex =
                    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
                return uuidRegex.test(val);
            },
            message: "Invalid UUID format",
        };
    },

    /**
     * Email validation
     */
    emailRegex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,

    /**
     * Phone validation (Vietnam)
     */
    phoneRegex: /^(0|84)[0-9]{9}$/,

    /**
     * Date string validation (yyyy-mm-dd)
     */
    dateRegex: /^\d{4}-\d{2}-\d{2}$/,
} as const;
