import { router, publicProcedure } from "./trpc";

import { moviesRouter } from "./routers/movies";
import { userRouter } from "./routers/user";

export const appRouter = router({
  hello: publicProcedure.query(() => {
    return { greeting: "Hello world" };
  }),
  movies: moviesRouter,
  user: userRouter,
});

// Export type for client usage
export type AppRouter = typeof appRouter;
