import Redis from "ioredis";

const redisConnection  = new Redis(6380);

export default redisConnection;