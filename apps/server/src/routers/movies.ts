import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { publicProcedure, router } from "../trpc";

import {
  searchMovies,
  searchKeywords,
  getMovieDetails,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getNowPlayingMovies,
  getPopularMoviesByGenre,
} from "../services/tmdb-service";

import {
  TmdbMovieSchema,
  TmdbPaginatedResponseSchema,
  TmdbKeywordSchema,
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
    .input(z.object({ query: z.string(), page: z.number().optional() }))
    .output(TmdbPaginatedResponseSchema(TmdbKeywordSchema))
    .query(({ input }) => {
      try {
        return searchKeywords(input.query, input.page || 1);
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error fetching search keywords",
          cause: error,
        });
      }
    }),
  searchMovies: publicProcedure
    .input(z.object({ query: z.string(), page: z.number().optional() }))
    .output(TmdbPaginatedResponseSchema(TmdbMovieSchema))
    .query(({ input }) => {
      try {
        return searchMovies(input.query, input.page || 1);
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error fetching search movies",
          cause: error,
        });
      }
    }),
});
