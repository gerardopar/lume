import { z } from "zod";
import { publicProcedure, router } from "../trpc";

import { getPopularMoviesByGenre } from "../services/tmdb-service";

import {
  TmdbMovieSchema,
  TmdbPaginatedResponseSchema,
} from "../validators/movies.validators";

export const moviesRouter = router({
  getPopularMoviesByGenre: publicProcedure
    .input(z.object({ genreId: z.number() }))
    .output(TmdbPaginatedResponseSchema(TmdbMovieSchema))
    .query(({ input }) => {
      return getPopularMoviesByGenre(input.genreId);
    }),
});
