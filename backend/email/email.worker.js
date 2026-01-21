import {Worker} from 'bullmq';
import { createRedisCOnnection } from '../config/redis.js';
import {db} from '../config/db.js'

const emailWorker = new Worker(
    "email-queue",
    async (job) => {

        const emailId = job.data.id; //id of current job

        const result = await db.query(`SELECT * FROM emails WHERE id=$1`, [emailId]);

        if(result.rowCount === 0){
            console.log("Worker could not found job ,skipping", emailId);
            return;
        }

        const email = result.rows[0];

        //Idempotency:skip if already sent
        if (email.status === "completed") {
            console.log("Email already sent, skipping", emailId);
            return;
        }

        await db.query("UPDATE emails SET status='processing' WHERE id=$1", [emailId]);
        

        //to do: Email  sending
        console.log("Processing job for:", email.to_email);
        await new Promise((res) => setTimeout(res, 1000)); 


        console.log("Email sent successfully:", emailId);

    },
    {
        connection: createRedisCOnnection() ,
        concurrency: 3
    }
);

emailWorker.on("completed", async (job) => {
    const emailId = job.data.id;
    await db.query(
        "UPDATE emails SET status='completed', sent_at=NOW() WHERE id=$1",
        [emailId]
    );
    console.error("Job completed id=", job.id);
});

emailWorker.on("failed", async (job, err) => {
    const emailId = job.data.id;
    await db.query("UPDATE emails SET status='failed' WHERE id=$1", [emailId])
        .catch(console.error);

    console.error("Job failed:", job.id, err.message);
});