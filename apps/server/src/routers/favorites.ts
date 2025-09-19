import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { protectedProcedure, router } from "../trpc";

import { getUserByFirebaseUid } from "../accessLayer/user";
import {
  createFavoriteItem,
  updateFavoriteItem,
  deleteFavoriteItem,
  getFavoriteItemsByUser,
  getFavoriteItemById,
} from "../accessLayer/favorites";
import {
  CreateFavoriteItemSchema,
  UpdateFavoriteItemSchema,
} from "../validators/favorites";
import assertOwnership from "../helpers/assertOwnership";

export const favoritesRouter = router({
  createFavoriteItem: protectedProcedure
    .input(CreateFavoriteItemSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const user = await getUserByFirebaseUid(ctx.user?.uid!);
        const favorite = await createFavoriteItem({
          ...input,
          userId: user?._id?.toString()!,
        });
        return favorite;
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Unable to create favorite item",
        });
      }
    }),

  updateFavoriteItem: protectedProcedure
    .input(z.object({ id: z.string(), input: UpdateFavoriteItemSchema }))
    .mutation(async ({ ctx, input }) => {
      try {
        const favorite = await updateFavoriteItem(input.id, input.input);

        if (favorite) {
          await assertOwnership(ctx, favorite.userId.toString());
        }

        return favorite;
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Unable to update favorite item",
        });
      }
    }),

  deleteFavoriteItem: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const favorite = await deleteFavoriteItem(input.id);

        if (favorite) {
          await assertOwnership(ctx, favorite.userId.toString());
        }

        return favorite;
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Unable to delete favorite item",
        });
      }
    }),

  getFavoriteItemsByUser: protectedProcedure.query(async ({ ctx }) => {
    try {
      const user = await getUserByFirebaseUid(ctx.user?.uid!);
      const favorites = await getFavoriteItemsByUser(user?._id?.toString()!);
      return favorites;
    } catch (error) {
      console.error(error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Unable to get favorite items",
      });
    }
  }),

  getFavoriteItemById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        const favorite = await getFavoriteItemById(input.id);

        if (favorite) {
          await assertOwnership(ctx, favorite.userId.toString());
        }

        return favorite;
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Unable to get favorite item",
        });
      }
    }),

  checkFavoriteItem: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        const user = await getUserByFirebaseUid(ctx.user?.uid!);
        const favorite = await getFavoriteItemsByUser(user?._id?.toString()!);
        const exists = favorite.some(
          (item) => item.tmdbId.toString() === input.id
        );
        return { exists };
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Unable to check favorite item",
        });
      }
    }),

  toggleFavoriteItem: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        favoriteItem: CreateFavoriteItemSchema.optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const user = await getUserByFirebaseUid(ctx.user?.uid!);

        if (!user?._id) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "User not found",
          });
        }

        const favorites = await getFavoriteItemsByUser(user._id.toString());

        const existing = favorites.find(
          (item) => item.tmdbId.toString() === input.id
        );

        if (existing) {
          await deleteFavoriteItem(existing._id.toString());
          return { isFavorite: false };
        } else {
          if (!input.favoriteItem) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message:
                "Favorite item snapshot is required to create favorite item",
            });
          }

          const created = await createFavoriteItem({
            ...input.favoriteItem,
            userId: user._id.toString(),
          });

          return { isFavorite: true, favorite: created };
        }
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Unable to toggle favorite item",
          cause: error,
        });
      }
    }),
});
