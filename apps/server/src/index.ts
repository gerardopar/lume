import "dotenv/config";

import cors from "cors";
import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";

import { connectRedis } from "./cache/redisClient";
import { connectDB } from "./db/db";

import { appRouter } from "./appRouter";
import { createContext } from "./context";

const app = express();
const port = process.env.PORT || 8080;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// Mount tRPC
app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

const startServer = async () => {
  try {
    await connectDB();
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
