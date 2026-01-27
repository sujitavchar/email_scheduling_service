import { db } from "../config/db.js";
import generateId from "./utils.id_generator.js";

const findUserByEmail = async (sender_email) => {
  const result = await db.query(
    "SELECT id, name, email FROM senders WHERE email = $1",
    [sender_email]
  );
  return result.rows[0] || null;
};

const createUser = async ({ name, email }) => {

    const id = generateId();
    const result = await db.query(
        "INSERT INTO senders (id, email, name, provider) VALUES ($1, $2, $3 ,$4) RETURNING id, name, email, provider",
        [id,email, name , "ethereal"]
    );
    return result.rows[0];
};


export {findUserByEmail, createUser};
