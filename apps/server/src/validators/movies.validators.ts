import { z } from "zod";

// Movie
export const TmdbMovieSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.string().nullable(),
  genre_ids: z.array(z.number()),
  id: z.number(),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string().nullable(),
  release_date: z.string(),
  title: z.string(),
  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.number(),
});

export type TmdbMovie = z.infer<typeof TmdbMovieSchema>;

export const TmdbPaginatedResponseSchema = <T extends z.ZodTypeAny>(
  itemSchema: T
) =>
  z.object({
    page: z.number(),
    results: z.array(itemSchema),
    total_pages: z.number(),
    total_results: z.number(),
  });

export type TmdbPaginatedResponse<T> = z.infer<
  ReturnType<typeof TmdbPaginatedResponseSchema<z.ZodTypeAny>>
>;

// Keyword Search
export const TmdbKeywordSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const TmdbKeywordSearchResponseSchema = z.object({
  page: z.number(),
  results: z.array(TmdbKeywordSchema),
  total_pages: z.number(),
  total_results: z.number(),
});
