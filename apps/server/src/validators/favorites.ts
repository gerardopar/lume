import { z } from "zod";

// Input
export const CreateFavoriteItemSchema = z.object({
  tmdbId: z.number().int().positive(),
  mediaType: z.enum(["movie", "tv"]),
  title: z.string().min(1),
  posterPath: z.string().optional(),
  releaseDate: z.string().optional(),
  overview: z.string().optional(),
  voteAverage: z.number().min(0).max(10).optional(),
  genreIds: z.array(z.number().int()).optional(),
});

export const UpdateFavoriteItemSchema = CreateFavoriteItemSchema.partial();

// Output
export const FavoriteItemOutputSchema = z.object({
  _id: z.string(),
  userId: z.string(),
  tmdbId: z.number(),
  mediaType: z.enum(["movie", "tv"]),
  title: z.string(),
  posterPath: z.string().nullable().optional(),
  releaseDate: z.string().nullable().optional(),
  overview: z.string().nullable().optional(),
  voteAverage: z.number().min(0).max(10).nullable().optional(),
  genreIds: z.array(z.number().int()).optional(),
  addedAt: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const FavoriteItemListOutputSchema = z.array(FavoriteItemOutputSchema);

export type CreateFavoriteItemInput = z.infer<typeof CreateFavoriteItemSchema>;
export type UpdateFavoriteItemInput = z.infer<typeof UpdateFavoriteItemSchema>;
export type FavoriteItemOutput = z.infer<typeof FavoriteItemOutputSchema>;
