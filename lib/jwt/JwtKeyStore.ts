export enum TokenType {
    ACCESS = "ACCESS",
    REFRESH = "REFRESH",
    ACTIVATION = "ACTIVATION",
}

export function getKey(type: TokenType) {
    const envKey =
        type === TokenType.ACCESS
            ? "JWT_ACCESS_SECRET"
            : type === TokenType.REFRESH
                ? "JWT_REFRESH_SECRET"
                : "JWT_ACTIVATION_SECRET";

    const secret = process.env[envKey];
    if (!secret) {
        throw new Error(`Missing env: ${envKey}`);
    }

    return new TextEncoder().encode(secret);
}
