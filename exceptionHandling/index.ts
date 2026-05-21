/**
 * ============================================
 * EXCEPTION HANDLING - BARREL EXPORT
 * ============================================
 *
 * Barrel export cho tất cả các modules trong exceptionHandling folder.
 * Cách sử dụng:
 *   import { AppError, handleError, validateRequestBody } from "@/exceptionHandling";
 *
 * Hoặc import riêng lẻ:
 *   import { AppError } from "@/exceptionHandling/app.exception";
 *   import { handleError } from "@/exceptionHandling/error-handler";
 */

// AppException
export { AppError } from "./app.exception";

// Exception Config
export { ExceptionCode } from "./exception.config";
export type { ExceptionKey } from "./app.exception";

// Error Handler
export {
    handleError,
    withErrorHandler,
    isErrorResponse,
    type ErrorResponse,
} from "./error-handler";

// Validation Utils
export {
    validateData,
    validateAndThrow,
    validateRequestBody,
    validateQueryParams,
    validateRouteParams,
    commonSchemas,
    type ValidationResult,
} from "./validation";
