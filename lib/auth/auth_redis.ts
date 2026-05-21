import { redis } from "@/lib/redis_config";

// =========================
// KEY BUILDERS
// =========================

export const refreshKey = (jwtId: string) => {
    return `refreshToken:${jwtId}`;
};

export const userTokensKey = (username: string) => {
    return `user:${username}:tokens`;
};

// =========================
// REFRESH TOKEN OPS
// =========================

export const saveRefreshToken = async (
    jwtId: string,
    username: string,
    ttl: number
) => {
    await redis.set(refreshKey(jwtId), username);
    await redis.expire(refreshKey(jwtId), ttl);
    await redis.sAdd(userTokensKey(username), jwtId);
};

export const getRefreshToken = (jwtId: string) => {
    return redis.get(refreshKey(jwtId));
};

export const deleteRefreshToken = (jwtId: string) => {
    return redis.del(refreshKey(jwtId));
};

export const removeUserToken = (username: string, jwtId: string) => {
    return redis.sRem(userTokensKey(username), jwtId);
};

export const getUserTokens = (username: string) => {
    return redis.sMembers(userTokensKey(username));
};

export const clearUserTokens = (username: string) => {
    return redis.del(userTokensKey(username));
};

// =========================
// ADVANCED HELPERS
// =========================

export const revokeAllUserTokens = async (username: string) => {
    const tokens = await getUserTokens(username);

    for (const jwtId of tokens) {
        await deleteRefreshToken(jwtId);
    }

    await clearUserTokens(username);
};