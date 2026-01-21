import { addEmailJob } from "./email/email.queue.js";
import "./email/email.worker.js";
import express from "express";
import cors from "cors";
import 'dotenv/config';


const app = express();
app.use(express.json());
app.use(cors());


app.post("/schedule-email", async (req,res) => {
    const {id, to, delayMs} = req.body;

    await addEmailJob({id,to}, delayMs);

    res.json({status : 200, message: "Email scheduled"});
});

app.listen(process.env.PORT, ()=>{
    console.log(`Server listening at port ${process.env.PORT}`);
})