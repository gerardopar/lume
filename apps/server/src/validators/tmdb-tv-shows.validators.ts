import { z } from "zod";

export const MediaImagePathSchema = z.string().nullable();

export const TvShowSchema = z.object({
  adult: z.boolean(),
  backdrop_path: MediaImagePathSchema,
  genre_ids: z.array(z.number()),
  id: z.number(),
  origin_country: z.array(z.string()),
  original_language: z.string(),
  original_name: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: MediaImagePathSchema,
  first_air_date: z.string(),
  name: z.string(),
  vote_average: z.number(),
  vote_count: z.number(),
});

export const TvShowsPaginatedResponseSchema = <T extends z.ZodTypeAny>(
  itemSchema: T
) =>
  z.object({
    page: z.number(),
    results: z.array(itemSchema),
    total_pages: z.number(),
    total_results: z.number(),
  });

export const TvResponseSchema = TvShowsPaginatedResponseSchema(TvShowSchema);

// 🔹 Inferred Types
export type TvShowType = z.infer<typeof TvShowSchema>;
export type TvResponseType = z.infer<typeof TvResponseSchema>;
