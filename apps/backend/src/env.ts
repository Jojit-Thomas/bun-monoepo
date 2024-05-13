import { z } from 'zod';

/**
 * Toggle environment variables
 * 'true' or '1' will evaluate to true
 * 'false' or '0' will evaluate to false
 */
const toggle = z
  .enum(['true', 'false', '0', '1'])
  .transform((v) => v === 'true' || v === '1');

const envVariables = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(8080),
  RUNTIME: z.enum(['bun', 'edge']).default('bun'),
  MONGODB_CONNECTION_STRING: z.string().min(1),
  AUTH_SECRET: z.string().min(1),
  AUTH_GOOGLE_ID: z.string().min(1),
  AUTH_GOOGLE_SECRET: z.string().min(1),
  CLIENT_URL: z.string().min(1),
  API_URL: z.string().min(1),
});

export const { NODE_ENV, PORT, RUNTIME, MONGODB_CONNECTION_STRING, AUTH_SECRET, AUTH_GOOGLE_ID, AUTH_GOOGLE_SECRET, CLIENT_URL, API_URL } = envVariables.parse(process.env);