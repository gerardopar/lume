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
  FavoriteItemOutputSchema,
  FavoriteItemListOutputSchema,
} from "../validators/favorites";

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
        const user = await getUserByFirebaseUid(ctx.user?.uid!);
        // TODO: check user ownership
        const favorite = await updateFavoriteItem(input.id, input.input);
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
        const user = await getUserByFirebaseUid(ctx.user?.uid!);
        // TODO: check user ownership
        const favorite = await deleteFavoriteItem(input.id);
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
        const user = await getUserByFirebaseUid(ctx.user?.uid!);
        // TODO: check user ownership
        const favorite = await getFavoriteItemById(input.id);
        return favorite;
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Unable to get favorite item",
        });
      }
    }),
});
