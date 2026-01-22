import {Queue, delay } from "bullmq";
import { createRedisCOnnection } from "../config/redis.js";
import {db} from "../config/db.js"

const emailQueue = new Queue(
    "email-queue",
    {
        connection: createRedisCOnnection(),
        limiter: {
            max: 50,
            duration: 1000 * 60 * 60, // 1 hour
            groupKey: (job) => job.data.sender_id,
        }
    }
);

async function addEmailJob(data) {
    const delayMs = Math.max(
        new Date(data.sendAt).getTime() - Date.now(),
        process.env.EMAIL_MIN_DELAY_MS || 0
    );

    console.log("New job delay : ", delayMs);

    await emailQueue.add(
        data.id, //job name
        data,
        {
            delay: delayMs,
            attempts: 3
        }
    );

    console.log("Job added in queue");
}


//Adds 'scheduled','failed', 'processing' jobs again in queue maintaining idempotency
async function resumeEmails() {
  const result = await db.query(
    `SELECT * FROM emails WHERE status IN ('failed')`
  );

  for (const email of result.rows) {
    const delayMs = Math.max(new Date(email.send_at).getTime() - Date.now(), 0);

    try {
      await emailQueue.add(
        email.id,          
        { id: email.id },
        { delay: delayMs, removeOnComplete: true, removeOnFail: false }
      );
      console.log("Rescheduled email:", email.id);
    } catch (err) {
      if (err.message.includes("Job already exists")) {
        console.log("Email already in queue, skipping:", email.id);
      } else {
        console.error("Failed to re-add email:", email.id, err);
      }
    }
  }
}


export {addEmailJob, resumeEmails};
