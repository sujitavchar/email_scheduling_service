import {Queue, delay } from "bullmq";
import { createRedisCOnnection } from "../config/redis.js";

const emailQeue = new Queue(
    "email-queue",
    {
        connection: createRedisCOnnection
    }
);

async function addEmailJob(data) {
    await emailQeue.add(
        "send-email", //job name
        data,
        {
            delay: process.env.EMAIL_MIN_DELAY_MS,
            attempts: 3
        }
    );

    console.log("Job added in queue");
}

export {addEmailJob};
