import { z } from "zod";
import { router, publicProcedure } from "./trpc";

import { userRouter } from "./routers/user";
import { moviesRouter } from "./routers/movies";
import { tvShowsRouter } from "./routers/tv-shows";
import { watchlistRouter } from "./routers/watchlist";
import { favoritesRouter } from "./routers/favorites";

export const appRouter = router({
  health: publicProcedure
    .input(z.void())
    .output(z.string())
    .query(() => {
      return "ok";
    }),
  user: userRouter,
  movies: moviesRouter,
  tvShows: tvShowsRouter,
  watchlist: watchlistRouter,
  favorites: favoritesRouter,
});

// Export type for client usage
export type AppRouter = typeof appRouter;
