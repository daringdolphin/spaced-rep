import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "~/env";
import * as schema from "./schema";

// Prevent browser imports
if (typeof window !== "undefined") {
  throw new Error(
    "This file should not be imported in the browser. Use server actions instead."
  );
}

// Types for global caching
declare global {
  // eslint-disable-next-line no-var
  var cachedClient: postgres.Sql | undefined;
}

let client: postgres.Sql;

// Development: Use global caching to prevent multiple connections during hot reload
if (process.env.NODE_ENV === "development") {
  if (!global.cachedClient) {
    global.cachedClient = postgres(env.DATABASE_URL, {
      prepare: false,
      // Disable SSL for local development
      ssl: false,
      max: 20, // Set pool size
    });
  }
  client = global.cachedClient;
} 
// Production: Create new connection
else {
  client = postgres(env.DATABASE_URL, {
    prepare: false,
    ssl: true,
    max: 20,
  });
}

// Initialize drizzle with schema
export const db = drizzle(client, { schema });
