import pg from "pg";
import 'dotenv/config'


//for Local host

const {Pool} = pg;

export const db = new Pool({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
  }
  )

  // export const db = new Pool({
  //   connectionString: process.env.DB_URL,
  //   ssl: {
  //     rejectUnauthorized: false
  //   }
  // });