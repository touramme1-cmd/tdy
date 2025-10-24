// Vercel Serverless Function - Catch-all API handler
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createApp } from '../server/app';

// Create Express app once (cached across invocations)
const app = createApp();

// Vercel serverless handler
export default function handler(req: VercelRequest, res: VercelResponse) {
  // Let Express handle the request
  app(req as any, res as any);
}
