import { Schema, model, Types } from "mongoose";

const FavoriteItemSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    tmdbId: {
      type: Number,
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

    addedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

FavoriteItemSchema.index(
  { userId: 1, tmdbId: 1, mediaType: 1 },
  { unique: true }
);

export const FavoriteItem = model("FavoriteItem", FavoriteItemSchema);
