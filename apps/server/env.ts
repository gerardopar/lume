import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
  PORT: z.string().default("8080"),
  TMDB_API_KEY: z.string(),
  REDIS_URL: z.string(),
  REDIS_HOST: z.string(),
  REDIS_PORT: z.string(),
  REDIS_USERNAME: z.string(),
  REDIS_PASSWORD: z.string(),
  MONGODB_USER: z.string(),
  MONGODB_PASSWORD: z.string(),
  MONGODB_HOST: z.string(),
  MONGODB_DB: z.string(),
  MONGODB_APPNAME: z.string(),
});

export const env = envSchema.parse({
  ...process.env,
});
