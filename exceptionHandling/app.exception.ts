import { ExceptionCode } from "./exception.config";

export type ExceptionKey = keyof typeof ExceptionCode;

export class AppError extends Error {
    statusCode: number;
    code: string;
    details?: any;

    constructor(key: ExceptionKey, details?: any, code?: any) {
        const exception = ExceptionCode[key];

        super(exception.message);

        this.statusCode = exception.statusCode;
        this.code = exception.code;
        this.details = details;

        Error.captureStackTrace(this, this.constructor);
    }
}