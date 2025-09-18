import { router } from "./trpc";

import { userRouter } from "./routers/user";
import { moviesRouter } from "./routers/movies";
import { tvShowsRouter } from "./routers/tv-shows";
import { watchlistRouter } from "./routers/watchlist";
import { favoritesRouter } from "./routers/favorites";

export const appRouter = router({
  user: userRouter,
  movies: moviesRouter,
  tvShows: tvShowsRouter,
  watchlist: watchlistRouter,
  favorites: favoritesRouter,
});

// Export type for client usage
export type AppRouter = typeof appRouter;
