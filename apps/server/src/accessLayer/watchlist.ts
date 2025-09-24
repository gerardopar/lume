import { Types } from "mongoose";
import { TRPCError } from "@trpc/server";
import { WatchlistItem } from "../models/watchlist";

type CreateWatchlistInput = {
  userId: string;
  tmdbId: number;
  mediaType: "movie" | "tv";
  title: string;
  posterPath?: string;
  releaseDate?: string;
  overview?: string;
  voteAverage?: number;
};

export const createWatchlistItem = async (input: CreateWatchlistInput) => {
  try {
    const watchlistItem = await WatchlistItem.findOneAndUpdate(
      {
        userId: new Types.ObjectId(input.userId),
        tmdbId: input.tmdbId,
        mediaType: input.mediaType,
      },
      { $setOnInsert: input },
      { new: true, upsert: true }
    ).exec();

    return watchlistItem;
  } catch (error) {
    console.error(error);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Unable to create watchlist item",
    });
  }
};

export const getWatchlistItemsByUser = async (userId: string) => {
  try {
    const watchlistItems = await WatchlistItem.find({
      userId: new Types.ObjectId(userId),
    })
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    return watchlistItems;
  } catch (error) {
    console.error(error);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Unable to get watchlist items",
    });
  }
};

export const getWatchlistItemById = async (id: string) => {
  try {
    const watchlistItem = await WatchlistItem.findById(id).exec();

    if (!watchlistItem) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Watchlist item not found",
      });
    }

    return watchlistItem;
  } catch (error) {
    console.error(error);
    if (error instanceof TRPCError) throw error;
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Unable to get watchlist item",
    });
  }
};

export const updateWatchlistItem = async (
  id: string,
  input: Partial<
    CreateWatchlistInput & { watched?: boolean; watchedAt?: Date | null }
  >
) => {
  try {
    const updatePayload = { ...input };

    // If watched is explicitly false, clear watchedAt
    if (input.watched === false) {
      updatePayload.watchedAt = null;
    }

    const watchlistItem = await WatchlistItem.findByIdAndUpdate(
      id,
      updatePayload,
      { new: true }
    ).exec();

    if (!watchlistItem) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Watchlist item not found",
      });
    }

    return watchlistItem;
  } catch (error) {
    console.error(error);
    if (error instanceof TRPCError) throw error;
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Unable to update watchlist item",
    });
  }
};

export const deleteWatchlistItem = async (id: string) => {
  try {
    const watchlistItem = await WatchlistItem.findByIdAndDelete(id).exec();

    if (!watchlistItem) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Watchlist item not found",
      });
    }

    return watchlistItem;
  } catch (error) {
    console.error(error);
    if (error instanceof TRPCError) throw error;
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Unable to delete watchlist item",
    });
  }
};

export const getWatchlistItemByTmdbId = async (
  userId: string,
  tmdbId: number
) => {
  try {
    const watchlistItem = await WatchlistItem.findOne({
      userId: new Types.ObjectId(userId),
      tmdbId,
    }).exec();

    if (!watchlistItem) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Watchlist item not found",
      });
    }

    return watchlistItem;
  } catch (error) {
    console.error(error);
    if (error instanceof TRPCError) throw error;
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Unable to get watchlist item by tmdbId",
    });
  }
};
