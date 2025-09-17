import { z } from "zod";

// Input
export const WatchlistItemZodSchema = z.object({
  userId: z.string().min(1, "UserId is required"), // ObjectId as string
  tmdbId: z.number().int().positive("tmdbId must be a positive number"),
  mediaType: z.enum(["movie", "tv"]),

  // Snapshot
  title: z.string().min(1, "Title is required"),
  posterPath: z.string().optional(),
  releaseDate: z.string().optional(), // you can refine with regex YYYY-MM-DD if you want
  overview: z.string().optional(),
  voteAverage: z.number().min(0).max(10).optional(),
  genreIds: z.array(z.number().int()).optional(),

  // Metadata
  addedAt: z.date().optional(),
  watched: z.boolean().optional(),
  watchedAt: z.date().optional(),
});

// For creating a new item (exclude DB-managed fields)
export const CreateWatchlistItemSchema = WatchlistItemZodSchema.omit({
  addedAt: true,
  watchedAt: true,
});

// For updating (all optional)
export const UpdateWatchlistItemSchema = WatchlistItemZodSchema.partial();

// Type inference
export type WatchlistItemInput = z.infer<typeof WatchlistItemZodSchema>;
export type CreateWatchlistItemInput = z.infer<
  typeof CreateWatchlistItemSchema
>;
export type UpdateWatchlistItemInput = z.infer<
  typeof UpdateWatchlistItemSchema
>;

// Output
export const WatchlistItemOutputSchema = z.object({
  _id: z.string(), // ObjectId serialized as string
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
  watched: z.boolean().default(false),
  watchedAt: z.date().nullable().optional(),

  createdAt: z.date(),
  updatedAt: z.date(),
});

export const WatchlistItemListOutputSchema = z.array(WatchlistItemOutputSchema);

// Inferred types
export type WatchlistItemOutput = z.infer<typeof WatchlistItemOutputSchema>;
export type WatchlistItemListOutput = z.infer<
  typeof WatchlistItemListOutputSchema
>;
