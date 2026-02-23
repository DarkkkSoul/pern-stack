import { Pool } from "pg";
import { ENV } from "../config/env.ts";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema.ts";

if (!ENV.DBURL) {
    throw new Error("DB URL not set");
}

const pool = new Pool({ connectionString: ENV.DBURL })

pool.on("connect", () => {
    console.log("Connected to database");
});

pool.on("error", (err) => {
    console.error("Database error", err);
});

export const db = drizzle({ client: pool, schema })