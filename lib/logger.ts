import pino from "pino";

export const logger = pino({
    level: process.env.NODE_ENV === "production" ? "info" : "debug",
});

// Re-export user action logger for convenience
export * from './logging';
