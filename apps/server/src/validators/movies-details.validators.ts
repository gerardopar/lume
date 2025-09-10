import { z } from "zod";

export const TmdbGenreSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const TmdbMovieDetailsSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.string().nullable(),
  budget: z.number(),
  genres: z.array(TmdbGenreSchema),
  homepage: z.string().nullable(),
  id: z.number(),
  imdb_id: z.string().nullable(),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string().nullable(),
  release_date: z.string(),
  revenue: z.number(),
  runtime: z.number().nullable(),
  status: z.string(), // e.g., "Released"
  tagline: z.string().nullable(),
  title: z.string(),
  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.number(),
});

export type TmdbMovieDetails = z.infer<typeof TmdbMovieDetailsSchema>;
