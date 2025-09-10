import { z } from "zod";
import { publicProcedure, router } from "../trpc";

import {
  searchMovies,
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
} from "../validators/movies.validators";
import { TmdbMovieDetailsSchema } from "../validators/movies-details.validators";

export const moviesRouter = router({
  getPopularMoviesByGenre: publicProcedure
    .input(z.object({ genreId: z.number() }))
    .output(TmdbPaginatedResponseSchema(TmdbMovieSchema))
    .query(({ input }) => {
      return getPopularMoviesByGenre(input.genreId);
    }),
  getMovieDetails: publicProcedure
    .input(z.object({ movieId: z.number() }))
    .output(TmdbMovieDetailsSchema)
    .query(({ input }) => {
      return getMovieDetails(input.movieId);
    }),
  getPopularMovies: publicProcedure
    .input(z.object({ page: z.number().optional() }))
    .output(TmdbPaginatedResponseSchema(TmdbMovieSchema))
    .query(({ input }) => {
      return getPopularMovies(input.page || 1);
    }),
  getTopRatedMovies: publicProcedure
    .input(z.object({ page: z.number().optional() }))
    .output(TmdbPaginatedResponseSchema(TmdbMovieSchema))
    .query(({ input }) => {
      return getTopRatedMovies(input.page || 1);
    }),
  getUpcomingMovies: publicProcedure
    .input(z.object({ page: z.number().optional() }))
    .output(TmdbPaginatedResponseSchema(TmdbMovieSchema))
    .query(({ input }) => {
      return getUpcomingMovies(input.page || 1);
    }),
  getNowPlayingMovies: publicProcedure
    .input(z.object({ page: z.number().optional() }))
    .output(TmdbPaginatedResponseSchema(TmdbMovieSchema))
    .query(({ input }) => {
      return getNowPlayingMovies(input.page || 1);
    }),
  searchMovies: publicProcedure
    .input(z.object({ query: z.string(), page: z.number().optional() }))
    .output(TmdbPaginatedResponseSchema(TmdbMovieSchema))
    .query(({ input }) => {
      return searchMovies(input.query, input.page || 1);
    }),
});
