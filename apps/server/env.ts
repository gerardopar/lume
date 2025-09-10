import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
  PORT: z.string().default("8080"),
  TMDB_API_KEY: z.string(),
});

export const env = envSchema.parse({
  ...process.env,
});
