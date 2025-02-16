import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "~/env";
import * as schema from "./schema";

// Disable prefetch as it is not supported for Supabase's pooling
const connectionString = env.DATABASE_URL;
const globalForDb = globalThis as unknown as {
  client: postgres.Sql | undefined;
};

// Create postgres client with pooling and SSL for production
const client = globalForDb.client ?? 
  postgres(connectionString, { 
    prepare: false,
    ssl: process.env.NODE_ENV === "production",
  });

// Cache client in development
if (process.env.NODE_ENV !== "production") globalForDb.client = client;

// Initialize drizzle with schema
export const db = drizzle(client, { schema });
