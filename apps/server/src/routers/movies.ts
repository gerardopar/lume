import { z } from "zod";
import { TRPCError } from "@trpc/server";
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
} from "../services/tmdb-service";

import { FilterOptionEnum } from "../types/tmdb.types";

import {
  TmdbMovieSchema,
  TmdbPaginatedResponseSchema,
} from "../validators/movies.validators";
import { TmdbMovieDetailsSchema } from "../validators/movies-details.validators";

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

      try {
        return await getPopularMoviesByGenre(input.genreId, page);
      } catch (error) {
        console.error("Error in getPopularMoviesByGenre:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error fetching popular movies by genre",
          cause: error,
        });
      }
    }),
  getMovieDetails: publicProcedure
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
  getPopularMovies: publicProcedure
    .input(z.object({ cursor: z.number().optional() }))
    .output(TmdbPaginatedResponseSchema(TmdbMovieSchema))
    .query(({ input }) => {
      const page = input.cursor ?? 1;

      try {
        return getPopularMovies(page);
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error fetching popular movies",
          cause: error,
        });
      }
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
});
