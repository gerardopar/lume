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
import assertOwnership from "../helpers/assertOwnership";

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
    .input(z.object({ id: z.string(), input: UpdateWatchlistItemSchema }))
    .mutation(async ({ ctx, input }) => {
      try {
        const watchlistItem = await updateWatchlistItem(input.id, input.input);

        await assertOwnership(ctx, watchlistItem?.userId!);

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
        const watchlistItem = await deleteWatchlistItem(input.id);

        await assertOwnership(ctx, watchlistItem?.userId!);

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
        const watchlistItem = await getWatchlistItemById(input.id);

        await assertOwnership(ctx, watchlistItem?.userId!);

        return watchlistItem;
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Unable to get watchlist item",
        });
      }
    }),

  checkWatchlistItem: protectedProcedure
    .input(z.object({ movieId: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        const user = await getUserByFirebaseUid(ctx.user?.uid!);
        const watchlist = await getWatchlistItemsByUser(user?._id?.toString()!);
        const exists = watchlist.some(
          (item) => item.tmdbId.toString() === input.movieId
        );
        return { exists };
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Unable to check watchlist item",
        });
      }
    }),
  toggleWatchlistItem: protectedProcedure
    .input(
      z.object({
        movieId: z.string(),
        movie: CreateWatchlistItemSchema.optional(),
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

        const watchlist = await getWatchlistItemsByUser(user._id.toString());

        const existing = watchlist.find(
          (item) => item.tmdbId.toString() === input.movieId
        );

        if (existing) {
          await deleteWatchlistItem(existing._id.toString());
          return { inWatchlist: false };
        } else {
          if (!input.movie) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Movie snapshot is required to add to watchlist",
            });
          }

          const created = await createWatchlistItem({
            ...input.movie,
            userId: user._id.toString(),
          });

          return { inWatchlist: true, watchlist: created };
        }
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Unable to toggle watchlist item",
          cause: error,
        });
      }
    }),
});
