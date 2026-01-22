import Redis from "ioredis";
import "dotenv/config";

export const createRedisCOnnection = () => {
    if (!process.env.REDIS_URL) {
        throw new Error("REDIS_URL is not defined");
    }
    return new Redis(process.env.REDIS_URL, {
        maxRetriesPerRequest: null,
        enableReadyCheck: false,
    });
};
