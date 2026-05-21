import { SignJWT, jwtVerify, JWTPayload } from "jose";
import crypto from "crypto";
import { getKey, TokenType } from "./JwtKeyStore";
import {
    saveRefreshToken,
    getRefreshToken,
    deleteRefreshToken,
    removeUserToken,
    revokeAllUserTokens,
} from "@/lib/auth/auth_redis";
import { logger } from "../logger";

const ISSUER = "myapp.com";

// =========================
// TYPES
// =========================

export type UserAccount = {
    id: string;
    username: string;
    roles: { name: string }[];
    permissions: string[];
};

export type JwtPayloadCustom = JWTPayload & {
    sub: string;
    scope: string;
    type: TokenType;
    jti: string;
    userId: string;
};

// =========================
// HELPERS
// =========================

const buildScope = (user: UserAccount): string =>
    user.roles.map((r) => r.name).join(" ");

const nowSeconds = (): number => Math.floor(Date.now() / 1000);

// =========================
// GENERATE TOKEN CORE
// =========================

const generateToken = async (
    user: UserAccount,
    type: TokenType,
    expSeconds: number
): Promise<{ token: string; jti: string }> => {
    const jti = crypto.randomUUID();

    const payload: JwtPayloadCustom = {
        sub: user.username,
        scope: buildScope(user),
        type,
        jti,
        userId: user.id,
    };

    const token = await new SignJWT(payload)
        .setProtectedHeader({
            alg: "HS512",
            kid: type,
        })
        .setIssuer(ISSUER)
        .setIssuedAt()
        .setExpirationTime(nowSeconds() + expSeconds)
        .sign(getKey(type));

    return { token, jti };
};

// =========================
// GENERATE TOKENS
// =========================

const generateAccessToken = async (
    user: UserAccount,
    exp: number
): Promise<string> => {
    const { token } = await generateToken(user, TokenType.ACCESS, exp);
    return token;
};

const generateRefreshToken = async (
    user: UserAccount,
    exp: number
): Promise<string> => {
    const { token, jti } = await generateToken(user, TokenType.REFRESH, exp);

    await saveRefreshToken(jti, user.username, exp);

    return token;
};

const generateActivationToken = async (
    user: UserAccount
): Promise<string> => {
    const { token } = await generateToken(user, TokenType.ACTIVATION, 900);
    return token;
};

// =========================
// VERIFY
// =========================

import { AppError } from "@/exceptionHandling/app.exception";

const verifyAndParse = async <T extends JWTPayload = JwtPayloadCustom>(
    token: string
): Promise<T> => {
    try {
        const { payload } = await jwtVerify(
            token,
            (header) => getKey(header.kid as TokenType),
            { issuer: ISSUER }
        );

        return payload as T;
    } catch (err) {
        throw new AppError("INVALID_TOKEN", undefined);
    }
};

// =========================
// ASSERT
// =========================

const assertAccessToken = (claims: JwtPayloadCustom): void => {
    if (claims.type !== TokenType.ACCESS) {
        throw new Error("INVALID_TOKEN_TYPE");
    }
};

const assertRefreshToken = async (claims: JwtPayloadCustom): Promise<void> => {
    if (claims.type !== TokenType.REFRESH) {
        throw new Error("INVALID_TOKEN_TYPE");
    }

    const storedUsername = await getRefreshToken(claims.jti);

    if (!storedUsername || storedUsername !== claims.sub) {
        throw new Error("TOKEN_INVALID");
    }
};

const assertActivationToken = (claims: JwtPayloadCustom): void => {
    if (claims.type !== TokenType.ACTIVATION) {
        throw new Error("INVALID_TOKEN_TYPE");
    }
};

// =========================
// REVOKE
// =========================

const revokeRefreshToken = async (
    jwtId: string,
    username: string
): Promise<void> => {
    await Promise.all([
        deleteRefreshToken(jwtId),
        removeUserToken(username, jwtId),
    ]);
};

const revokeAllTokens = async (username: string): Promise<void> => {
    await revokeAllUserTokens(username);
};

// =========================

export const jwtService = {
    generateAccessToken,
    generateRefreshToken,
    generateActivationToken,
    verifyAndParse,
    assertAccessToken,
    assertRefreshToken,
    assertActivationToken,
    revokeRefreshToken,
    revokeAllTokens,
};
