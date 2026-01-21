import Redis from "ioredis";

export const createRedisCOnnection = ()=> {
    return new Redis({
            host: process.env.REDIS_HOST || "127.0.0.1",
            port: Number(process.env.REDIS_PORT || 6379),
            password: process.env.REDIS_PASSWORD || undefined,
            maxRetriesPerRequest: null
        }
    )
};

