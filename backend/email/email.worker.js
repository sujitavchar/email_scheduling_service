import {Worker} from 'bullmq';
import { createRedisCOnnection } from '../config/redis.js';

const emailWorker = new Worker(
    "email-queue",
    async (job) => {
        //to do: set email status as "processing " in db
        console.log("Processing job");
        console.log("JObdata:" , job.data);

        //to do: send email logic in ethereal

        console.log("Email sent successfully");
    },
    {
        connection: createRedisCOnnection() ,
        concurrency: 3
    }
);

emailWorker.on("completed", (job) => {
    //to do: mark email status as completed in db

    console.error("Job completed id=", job.id);
});

emailWorker.on("failed", (job, err) => {
    //to do : mark email status as "failed in db"

    console.error("Job failed:", job.id, err.message);
});