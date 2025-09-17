import { z } from "zod";

export const userSchema = z.object({
  name: z.string().optional(),
  bio: z.string().optional(),
  picture: z.string().optional(),
  email: z.string(),
  username: z.string().optional(),
});

export type User = z.infer<typeof userSchema>;
