import { addEmailJob, resumeEmails } from "./email/email.queue.js";
import "./email/email.worker.js";
import express from "express";
import cors from "cors";
import 'dotenv/config';
import {db} from './config/db.js'
import generateId from "./utils/utils.id_generator.js";



const app = express();
app.use(express.json());
app.use(cors());


await resumeEmails()
  .then(()=> console.log("Stuck/failed emails rescheduled"))
  .catch((err) => console.error("Failed to resume emails", err));


//routes
  app.post("/schedule-email", async (req,res) => {
    const {to, subject, body, sendAt, sender_id} = req.body;
    const id = generateId();
    
    await db.query(
        `INSERT INTO emails (id, to_email, subject, body, send_at, sender_id)
        VALUES ($1,$2,$3,$4,$5,$6)`,
        [id, to, subject, body, sendAt, sender_id]
    );


    await addEmailJob({id, sendAt});

    res.json({status : 200, message: "Email scheduled"});
});

app.get("/all-emails", async(req, res)=> {
    const {sender_id} = req.query;

    try {
      const result = await db.query(`SELECT * FROM emails WHERE sender_id=$1 ORDER BY created_at ASC` , [sender_id]);

      res.json({
        status: 200,
        message: "Data Fetched successfully",
        data: result.rows
      });
    } catch (e) {
      res.json({
        status: 500,
        message: `Internal server error. ${e}`
      })
    }
   
});

app.listen(process.env.PORT, ()=>{
    console.log(`Server listening at port ${process.env.PORT}`);
})