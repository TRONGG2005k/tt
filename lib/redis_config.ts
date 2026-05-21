import { createClient } from "redis";

const globalForRedis = globalThis as unknown as {
    redis: ReturnType<typeof createClient> | undefined;
};

export const redis =
    globalForRedis.redis ??
    createClient({
        username: process.env.REDIS_USERNAME,
        password: process.env.REDIS_PASSWORD,
        socket: {
            host: process.env.REDIS_HOST,
            port: Number(process.env.REDIS_PORT),
        },
    });

if (!globalForRedis.redis) {
    globalForRedis.redis = redis;

    redis.on("error", (err) => {
        console.error("Redis Client Error", err);
    });

    redis.connect(); // chỉ connect 1 lần
}