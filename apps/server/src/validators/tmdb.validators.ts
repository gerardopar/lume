import { z } from "zod";
import { FilterOptionEnum } from "../types/tmdb.types";

// Factories
const TmdbPaginatedResponseSchema = <T extends z.ZodTypeAny>(item: T) =>
  z.object({
    page: z.number(),
    results: z.array(item),
    total_pages: z.number(),
    total_results: z.number(),
  });

// Schemas
const TmdbMovieSchema = z.object({
  id: z.number(),
  title: z.string(),
  original_title: z.string(),
  overview: z.string(),
  release_date: z.string().nullable(),
  poster_path: z.string().nullable(),
  backdrop_path: z.string().nullable(),
  genre_ids: z.array(z.number()),
  vote_average: z.number(),
  vote_count: z.number(),
  popularity: z.number(),
  adult: z.boolean(),
  original_language: z.string(),
  video: z.boolean().optional(),
});

const TmdbTvShowSchema = z.object({
  id: z.number(),
  name: z.string(),
  original_name: z.string(),
  overview: z.string(),
  poster_path: z.string().nullable(),
  backdrop_path: z.string().nullable(),
  first_air_date: z.string().nullable(),
  origin_country: z.array(z.string()),
  genre_ids: z.array(z.number()),
  vote_average: z.number(),
  vote_count: z.number(),
  popularity: z.number(),
  original_language: z.string(),
});

const MultiSearchResultSchema = z.discriminatedUnion("media_type", [
  TmdbMovieSchema.extend({ media_type: z.literal("movie") }),
  TmdbTvShowSchema.extend({ media_type: z.literal("tv") }),
  z.object({
    id: z.number(),
    media_type: z.literal("person"),
    name: z.string(),
    profile_path: z.string().nullable(),
    popularity: z.number(),
    backdrop_path: z.string().nullable(),
    poster_path: z.string().nullable().optional(),
    known_for: z.array(
      z.union([
        TmdbMovieSchema.extend({ media_type: z.literal("movie") }),
        TmdbTvShowSchema.extend({ media_type: z.literal("tv") }),
      ])
    ),
  }),
]);

// Union of all possible responses
export const TmdbSearchOutputSchema = z.union([
  TmdbPaginatedResponseSchema(TmdbMovieSchema),
  TmdbPaginatedResponseSchema(TmdbTvShowSchema),
  TmdbPaginatedResponseSchema(MultiSearchResultSchema),
]);
