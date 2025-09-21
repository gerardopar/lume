import { Types } from "mongoose";
import { TRPCError } from "@trpc/server";
import { FavoriteItem } from "../models/favorites";

type CreateFavoriteInput = {
  userId: string;
  tmdbId: number;
  mediaType: "movie" | "tv";
  title: string;
  posterPath?: string;
  releaseDate?: string;
  overview?: string;
  voteAverage?: number;
  genreIds?: number[];
};

export const createFavoriteItem = async (input: CreateFavoriteInput) => {
  try {
    const favoriteItem = await FavoriteItem.findOneAndUpdate(
      {
        userId: new Types.ObjectId(input.userId),
        tmdbId: input.tmdbId,
        mediaType: input.mediaType,
      },
      { $setOnInsert: input },
      { new: true, upsert: true }
    ).exec();

    return favoriteItem;
  } catch (error) {
    console.error(error);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Unable to create favorite item",
    });
  }
};

export const getFavoriteItemsByUser = async (userId: string) => {
  try {
    const favorites = await FavoriteItem.find({
      userId: new Types.ObjectId(userId),
    })
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    return favorites;
  } catch (error) {
    console.error(error);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Unable to get favorite items",
    });
  }
};

export const getFavoriteItemById = async (id: string) => {
  try {
    const favorite = await FavoriteItem.findById(id).exec();

    if (!favorite) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Favorite item not found",
      });
    }

    return favorite;
  } catch (error) {
    console.error(error);
    if (error instanceof TRPCError) throw error;
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Unable to get favorite item",
    });
  }
};

export const updateFavoriteItem = async (
  id: string,
  input: Partial<CreateFavoriteInput>
) => {
  try {
    const favorite = await FavoriteItem.findByIdAndUpdate(id, input, {
      new: true,
    }).exec();

    if (!favorite) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Favorite item not found",
      });
    }

    return favorite;
  } catch (error) {
    console.error(error);
    if (error instanceof TRPCError) throw error;
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Unable to update favorite item",
    });
  }
};

export const deleteFavoriteItem = async (id: string) => {
  try {
    const favorite = await FavoriteItem.findByIdAndDelete(id).exec();

    if (!favorite) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Favorite item not found",
      });
    }

    return favorite;
  } catch (error) {
    console.error(error);
    if (error instanceof TRPCError) throw error;
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Unable to delete favorite item",
    });
  }
};
