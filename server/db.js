import { Pool, types } from "pg";

import dotenv from "dotenv";
dotenv.config();

// To prevent auto conversion of date into UTC format which sends the time back by 5:30 hrs
types.setTypeParser(1082, val => val);

// It refers to the connection pool => it basically manages connections and allows us to 
// use it across the app without reconnecting every time. It is the standard way of talking to 
// PostgreSQL in Nodejs
const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
})

export default pool;

