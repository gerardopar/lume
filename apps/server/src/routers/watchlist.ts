import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { protectedProcedure, router } from "../trpc";

import { getUserByFirebaseUid } from "../accessLayer/user";
import {
  createWatchlistItem,
  updateWatchlistItem,
  deleteWatchlistItem,
  getWatchlistItemsByUser,
  getWatchlistItemById,
} from "../accessLayer/watchlist";
import {
  CreateWatchlistItemSchema,
  UpdateWatchlistItemSchema,
} from "../validators/watchlist";

export const watchlistRouter = router({
  createWatchlistItem: protectedProcedure
    .input(CreateWatchlistItemSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const user = await getUserByFirebaseUid(ctx.user?.uid!);
        const watchlistItem = await createWatchlistItem({
          ...input,
          userId: user?._id?.toString()!,
        });
        return watchlistItem;
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Unable to create watchlist item",
        });
      }
    }),
  updateWatchlistItem: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        input: UpdateWatchlistItemSchema,
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const user = await getUserByFirebaseUid(ctx.user?.uid!);
        // TODO check if user is the owner of the watchlist item
        const watchlistItem = await updateWatchlistItem(input.id, input.input);
        return watchlistItem;
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Unable to update watchlist item",
        });
      }
    }),
  deleteWatchlistItem: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const user = await getUserByFirebaseUid(ctx.user?.uid!);
        // TODO check if user is the owner of the watchlist item
        const watchlistItem = await deleteWatchlistItem(input.id);
        return watchlistItem;
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Unable to delete watchlist item",
        });
      }
    }),
  getWatchlistItemsByUser: protectedProcedure.query(async ({ ctx }) => {
    try {
      const user = await getUserByFirebaseUid(ctx.user?.uid!);
      const watchlistItems = await getWatchlistItemsByUser(
        user?._id?.toString()!
      );
      return watchlistItems;
    } catch (error) {
      console.error(error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Unable to get watchlist items",
      });
    }
  }),
  getWatchlistItemById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        const user = await getUserByFirebaseUid(ctx.user?.uid!);
        // TODO check if user is the owner of the watchlist item
        const watchlistItem = await getWatchlistItemById(input.id);
        return watchlistItem;
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Unable to get watchlist item",
        });
      }
    }),
});
