import Queue, { delay } from "bullmq";
import { createRedisCOnnection } from "../config/redis";

const emailQeue = new Queue(
    email-queue,
    {
        connection: createRedisCOnnection
    }
);

async function addEmailJob(data, delayMs=0) {
    await emailQeue.add(
        "send-email", //job name
        data,
        {
            delay: delayMs,
            attempts: 3
        }
    );

    console.log("Email scduled successfully");
}

export {addEmailJob};
