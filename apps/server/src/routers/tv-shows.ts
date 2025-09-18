import { z } from "zod";
import { TRPCError } from "@trpc/server";
import redisClient from "../cache/redisClient";
import { publicProcedure, router } from "../trpc";

import {
  getPopularTvShows,
  getPopularTvShowsByGenre,
  getTvShowDetails,
  getTvSeasonSeriesDetails,
  getTvSeasonVideos,
  searchTvShows,
  getTrendingTvShows,
} from "../services/tmdb-tv-shows-service";

import {
  TvShowSchema,
  TvShowsPaginatedResponseSchema,
} from "../validators/tmdb-tv-shows.validators";
import { TVSeasonVideosResponseSchema } from "../validators/videos.validators";

const CACHE_TTL = 60 * 60; // 1 hour

export const tvShowsRouter = router({
  getPopularTvShowsByGenre: publicProcedure
    .input(
      z.object({
        genreId: z.number(),
        cursor: z.number().optional(),
      })
    )
    .output(TvShowsPaginatedResponseSchema(TvShowSchema))
    .query(async ({ input }) => {
      const page = input.cursor ?? 1;

      if (page <= 5) {
        const cacheKey = `tv:popular:genre:${input.genreId}:page:${page}`;
        try {
          const cached = await redisClient.get(cacheKey);
          if (cached) {
            return JSON.parse(cached);
          }

          const res = await getPopularTvShowsByGenre(input.genreId, page);
          await redisClient.set(cacheKey, JSON.stringify(res), {
            EX: CACHE_TTL,
          });
          return res;
        } catch (error) {
          console.error("Error in getPopularTvShowsByGenre:", error);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Error fetching popular TV shows by genre",
            cause: error,
          });
        }
      }

      return getPopularTvShowsByGenre(input.genreId, page);
    }),

  getPopularTvShows: publicProcedure
    .input(z.object({ cursor: z.number().optional() }))
    .output(TvShowsPaginatedResponseSchema(TvShowSchema))
    .query(async ({ input }) => {
      const page = input.cursor ?? 1;

      if (page <= 5) {
        const cacheKey = `tv:popular:page:${page}`;
        try {
          const cached = await redisClient.get(cacheKey);
          if (cached) {
            return JSON.parse(cached);
          }

          const res = await getPopularTvShows(page);
          await redisClient.set(cacheKey, JSON.stringify(res), {
            EX: CACHE_TTL,
          });
          return res;
        } catch (error) {
          console.error("Error in getPopularTvShows:", error);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Error fetching popular TV shows",
            cause: error,
          });
        }
      }

      return getPopularTvShows(page);
    }),

  getTrendingTvShows: publicProcedure
    .input(
      z.object({
        timeWindow: z.enum(["day", "week"]).default("day"),
        cursor: z.number().optional(),
      })
    )
    .output(TvShowsPaginatedResponseSchema(TvShowSchema))
    .query(async ({ input }) => {
      const page = input.cursor ?? 1;
      const cacheKey = `tv:trending:${input.timeWindow}:page:${page}`;

      // attempt cache if first few pages
      if (page <= 5) {
        try {
          const cached = await redisClient.get(cacheKey);
          if (cached) {
            return JSON.parse(cached);
          }
        } catch (err) {
          console.error("Redis get error in getTrendingTvShows:", err);
          // not critical, continue
        }
      }

      // fetch from TMDB
      let data;
      try {
        data = await getTrendingTvShows(input.timeWindow, page);
      } catch (err) {
        console.error("Error from getTrendingTvShows helper:", err);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error fetching trending TV shows",
          cause: err,
        });
      }

      // set cache if page <= some threshold
      if (page <= 5) {
        try {
          await redisClient.set(cacheKey, JSON.stringify(data), {
            EX: CACHE_TTL,
          });
        } catch (err) {
          console.error("Redis set error in getTrendingTvShows:", err);
        }
      }

      return data;
    }),

  getTvShowDetails: publicProcedure
    .input(z.object({ seriesId: z.number() }))
    .query(({ input }) => {
      try {
        return getTvShowDetails(input.seriesId);
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error fetching TV show details",
          cause: error,
        });
      }
    }),

  getTvSeasonDetails: publicProcedure
    .input(z.object({ seriesId: z.number(), seasonNumber: z.number() }))
    .query(({ input }) => {
      try {
        return getTvSeasonSeriesDetails(input.seriesId, input.seasonNumber);
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error fetching TV season details",
          cause: error,
        });
      }
    }),

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

  searchTvShows: publicProcedure
    .input(z.object({ query: z.string(), cursor: z.number().optional() }))
    .output(TvShowsPaginatedResponseSchema(TvShowSchema))
    .query(({ input }) => {
      const page = input.cursor ?? 1;
      try {
        return searchTvShows(input.query, page);
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error searching TV shows",
          cause: error,
        });
      }
    }),
});
