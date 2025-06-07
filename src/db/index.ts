import { drizzle } from 'drizzle-orm/neon-http';

import * as schema from "@/db/schema";
import * as dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
import { neon } from '@neondatabase/serverless';

dotenvExpand.expand(
  dotenv.config({
    path: [".env.development.local", ".env.production.local", ".env.local"],
  }),
);

export const getDbConnectionString = () => {
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
        throw new Error("DATABASE_URL is not defined in the environment variables.");
    }
    return dbUrl;
}

const sql = neon(getDbConnectionString());
export const db = drizzle({ client: sql , schema});
