import { router } from "./trpc";

import { moviesRouter } from "./routers/movies";
import { userRouter } from "./routers/user";
import { watchlistRouter } from "./routers/watchlist";
import { favoritesRouter } from "./routers/favorites";

export const appRouter = router({
  user: userRouter,
  movies: moviesRouter,
  watchlist: watchlistRouter,
  favorites: favoritesRouter,
});

// Export type for client usage
export type AppRouter = typeof appRouter;
