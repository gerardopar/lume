import { router, publicProcedure } from "./trpc";

import { moviesRouter } from "./routers/movies";

export const appRouter = router({
  hello: publicProcedure.query(() => {
    return { greeting: "Hello world" };
  }),
  movies: moviesRouter,
});

// Export type for client usage
export type AppRouter = typeof appRouter;
