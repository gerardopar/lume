import "dotenv/config";

import express from "express";
import cors from "cors";
import * as trpcExpress from "@trpc/server/adapters/express";

import { connectRedis } from "./cache/redisClient";

import { appRouter } from "./appRouter";

const app = express();
const port = process.env.PORT || 8080;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: () => ({}),
  })
);

const startServer = async () => {
  try {
    await connectRedis();

    app.listen(port, () => {
      console.log(`👨🏽‍🍳 tRPC endpoint ready at /trpc`);
      console.log(`🚀 Server running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
};

startServer();
