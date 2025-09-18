import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { publicProcedure, router } from "../trpc";

import { getTvSeasonVideos } from "../services/tmdb-tv-shows-service";

import { TVSeasonVideosResponseSchema } from "../validators/videos.validators";

export const tvShowsRouter = router({
  getTvSeasonVideos: publicProcedure
    .input(z.object({ seriesId: z.number(), seasonNumber: z.number() }))
    .output(TVSeasonVideosResponseSchema)
    .query(({ input }) => {
      try {
        return getTvSeasonVideos(input.seriesId, input.seasonNumber);
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error fetching TV season videos",
          cause: error,
        });
      }
    }),
});
