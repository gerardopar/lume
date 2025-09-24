import { Schema, model, Types } from "mongoose";

const WatchlistItemSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    tmdbId: {
      type: Number, // TMDB ID reference
      required: true,
    },
    mediaType: {
      type: String,
      enum: ["movie", "tv"],
      required: true,
    },

    // Lightweight snapshot
    title: { type: String, required: true },
    posterPath: { type: String },
    releaseDate: { type: String },
    overview: { type: String },
    voteAverage: { type: Number },
    genreIds: { type: [Number] },

    // User-specific metadata
    addedAt: { type: Date, default: Date.now },
    watched: { type: Boolean, default: false },
    watchedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

WatchlistItemSchema.index(
  { userId: 1, tmdbId: 1, mediaType: 1 },
  { unique: true }
);

export const WatchlistItem = model("WatchlistItem", WatchlistItemSchema);
