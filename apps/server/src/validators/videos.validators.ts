import { z } from "zod";

export const VideoResultSchema = z.object({
  id: z.string(),
  iso_639_1: z.string().nullable(),
  iso_3166_1: z.string().nullable(),
  key: z.string(),
  name: z.string(),
  site: z.string(),
  size: z.number(),
  type: z.string(),
  official: z.boolean().optional(),
  published_at: z.string().optional(), // ISO timestamp
});

// Movie Videos Response
export const MovieVideosResponseSchema = z.object({
  id: z.number(),
  results: z.array(VideoResultSchema),
});

// TV Season Videos Response
export const TVSeasonVideosResponseSchema = z.object({
  id: z.number(), // TV show id
  season_number: z.number(),
  results: z.array(VideoResultSchema),
});

export type VideoResult = z.infer<typeof VideoResultSchema>;
export type MovieVideosResponse = z.infer<typeof MovieVideosResponseSchema>;
export type TVSeasonVideosResponse = z.infer<
  typeof TVSeasonVideosResponseSchema
>;
