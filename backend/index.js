import { addEmailJob } from "./email/email.queue.js";
import "./email/email.worker.js";
import express from "express";
import cors from "cors";
import 'dotenv/config';
import {db} from './config/db.js'
import generateId from "./utils/utils.id_generator.js";


const app = express();
app.use(express.json());
app.use(cors());


app.post("/schedule-email", async (req,res) => {
    const {to, subject, body, sendAt} = req.body;

    await db.query(
        `INSERT INTO emails (id, to_email, subject, body, send_at)
        VALUES ($1,$2,$3,$4,$5)`,
        [id, to, subject, body, sendAt]
    );

    const id = generateId();

    await addEmailJob({id, to, subject, body, sendAt});

    res.json({status : 200, message: "Email scheduled"});
});

app.listen(process.env.PORT, ()=>{
    console.log(`Server listening at port ${process.env.PORT}`);
})