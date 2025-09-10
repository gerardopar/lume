import { initTRPC } from "@trpc/server";
import { z } from "zod";

const t = initTRPC.create();

export const appRouter = t.router({
  hello: t.procedure
    .input(z.object({ name: z.string().nullish() }))
    .query(({ input }) => {
      return { greeting: `Hello ${input?.name ?? "world"}` };
    }),
});

// Export type for client usage
export type AppRouter = typeof appRouter;
