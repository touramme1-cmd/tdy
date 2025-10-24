// Referenced from javascript_database blueprint integration
import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

// Configure for Vercel serverless (use fetch) or local dev (use WebSocket)
if (process.env.VERCEL) {
  neonConfig.fetchConnectionCache = true;  ✅ MARCHE SUR VERCEL
} else {
  neonConfig.webSocketConstructor = ws;  ✅ MARCHE EN LOCAL
}

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle({ client: pool, schema });
