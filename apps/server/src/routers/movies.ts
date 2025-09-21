import { z } from "zod";
import { TRPCError } from "@trpc/server";
import redisClient from "../cache/redisClient";
import { publicProcedure, router } from "../trpc";

import {
  searchMovies,
  getMovieDetails,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getNowPlayingMovies,
  getPopularMoviesByGenre,
  tmdbSearch,
  getMovieVideos,
  getMovieWatchProviders,
  getMovieCast,
} from "../services/tmdb-service";

import { FilterOptionEnum } from "../types/tmdb.types";

import {
  TmdbMovieSchema,
  TmdbPaginatedResponseSchema,
} from "../validators/movies.validators";
import { TmdbMovieDetailsSchema } from "../validators/movies-details.validators";
import { MovieVideosResponseSchema } from "../validators/videos.validators";

const CACHE_TTL = 60 * 60; // 1 hour

export const moviesRouter = router({
  getPopularMoviesByGenre: publicProcedure
    .input(
      z.object({
        genreId: z.number(),
        cursor: z.number().optional(),
      })
    )
    .output(TmdbPaginatedResponseSchema(TmdbMovieSchema))
    .query(async ({ input }) => {
      const page = input.cursor ?? 1;

      // cache only the first 5 pages
      if (page <= 5) {
        const cacheKey = `movies:popular:genre:${input.genreId}:page:${page}`;

        try {
          // Try cache first
          const cached = await redisClient.get(cacheKey);
          if (cached) {
            return JSON.parse(cached);
          }

          // Otherwise fetch from TMDB
          const res = await getPopularMoviesByGenre(input.genreId, page);

          await redisClient.set(cacheKey, JSON.stringify(res), {
            EX: CACHE_TTL,
          });

          return res;
        } catch (error) {
          console.error("Error in getPopularMoviesByGenre:", error);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Error fetching popular movies by genre",
            cause: error,
          });
        }
      }

      // If page > 5, skip caching
      return getPopularMoviesByGenre(input.genreId, page);
    }),
  getMovieDetailsSimple: publicProcedure
    .input(z.object({ movieId: z.number() }))
    .output(TmdbMovieDetailsSchema)
    .query(({ input }) => {
      try {
        return getMovieDetails(input.movieId);
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error fetching movie details",
          cause: error,
        });
      }
    }),
  getMovieDetails: publicProcedure
    .input(z.object({ movieId: z.number() }))
    .query(async ({ input }) => {
      try {
        const movieDetails = await getMovieDetails(input.movieId);
        const movieVideos = await getMovieVideos(input.movieId);
        const movieCast = await getMovieCast(input.movieId);
        const movieWatchProviders = await getMovieWatchProviders(input.movieId);

        return {
          details: movieDetails,
          videos: movieVideos,
          credits: movieCast,
          watchProviders: movieWatchProviders,
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error fetching movie details",
          cause: error,
        });
      }
    }),
  getPopularMovies: publicProcedure
    .input(z.object({ cursor: z.number().optional() }))
    .output(TmdbPaginatedResponseSchema(TmdbMovieSchema))
    .query(async ({ input }) => {
      const page = input.cursor ?? 1;

      // cache only first 5 pages
      if (page <= 5) {
        const cacheKey = `movies:popular:page:${page}`;

        try {
          const cached = await redisClient.get(cacheKey);
          if (cached) {
            return JSON.parse(cached);
          }

          const res = await getPopularMovies(page);
          await redisClient.set(cacheKey, JSON.stringify(res), {
            EX: CACHE_TTL,
          });

          return res;
        } catch (error) {
          console.error("Error in getPopularMovies:", error);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Error fetching popular movies",
            cause: error,
          });
        }
      }

      // if page > 5, skip cache
      return getPopularMovies(page);
    }),
  getTopRatedMovies: publicProcedure
    .input(z.object({ cursor: z.number().optional() }))
    .output(TmdbPaginatedResponseSchema(TmdbMovieSchema))
    .query(({ input }) => {
      const page = input.cursor ?? 1;

      try {
        return getTopRatedMovies(page);
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error fetching top rated movies",
          cause: error,
        });
      }
    }),
  getUpcomingMovies: publicProcedure
    .input(z.object({ cursor: z.number().optional() }))
    .output(TmdbPaginatedResponseSchema(TmdbMovieSchema))
    .query(({ input }) => {
      const page = input.cursor ?? 1;

      try {
        return getUpcomingMovies(page);
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error fetching upcoming movies",
          cause: error,
        });
      }
    }),
  getNowPlayingMovies: publicProcedure
    .input(z.object({ cursor: z.number().optional() }))
    .output(TmdbPaginatedResponseSchema(TmdbMovieSchema))
    .query(({ input }) => {
      const page = input.cursor ?? 1;

      try {
        return getNowPlayingMovies(page);
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error fetching now playing movies",
          cause: error,
        });
      }
    }),
  searchKeywords: publicProcedure
    .input(
      z.object({
        query: z.string(),
        cursor: z.number().optional(),
        filter: z
          .enum([
            FilterOptionEnum.All,
            FilterOptionEnum.Movies,
            FilterOptionEnum.TV,
          ])
          .optional()
          .default(FilterOptionEnum.All),
      })
    )
    .query(async ({ input }) => {
      const page = input.cursor ?? 1;
      try {
        return await tmdbSearch(input.query, page, input.filter);
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error fetching search",
          cause: error,
        });
      }
    }),
  searchMovies: publicProcedure
    .input(z.object({ query: z.string(), cursor: z.number().optional() }))
    .output(TmdbPaginatedResponseSchema(TmdbMovieSchema))
    .query(({ input }) => {
      const page = input.cursor ?? 1;

      try {
        return searchMovies(input.query, page);
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error fetching search movies",
          cause: error,
        });
      }
    }),
  getMovieVideos: publicProcedure
    .input(z.object({ movieId: z.number() }))
    .output(MovieVideosResponseSchema)
    .query(({ input }) => {
      try {
        return getMovieVideos(input.movieId);
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error fetching movie videos",
          cause: error,
        });
      }
    }),
  getMovieCast: publicProcedure
    .input(z.object({ movieId: z.number() }))
    .output(TmdbMovieDetailsSchema)
    .query(({ input }) => {
      try {
        return getMovieCast(input.movieId);
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error fetching movie cast",
          cause: error,
        });
      }
    }),
  getMovieWatchProviders: publicProcedure
    .input(z.object({ movieId: z.number() }))
    .output(TmdbMovieDetailsSchema)
    .query(({ input }) => {
      try {
        return getMovieWatchProviders(input.movieId);
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error fetching movie watch providers",
          cause: error,
        });
      }
    }),
});
