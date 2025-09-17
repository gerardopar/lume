import { firebaseAdmin } from "./firebase/firebase";

import type { UserRecord } from "firebase-admin/auth";
import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";

export const createContext = async ({
  req,
  res,
}: CreateExpressContextOptions) => {
  const authHeader = req.headers.authorization;
  let user: null | UserRecord = null;

  if (authHeader?.startsWith("Bearer ")) {
    const idToken = authHeader.split(" ")[1];
    try {
      const decoded = await firebaseAdmin.auth().verifyIdToken(idToken);
      user = await firebaseAdmin.auth().getUser(decoded.uid);
    } catch (error) {
      console.warn("Invalid Firebase token", error);
    }
  }

  return { req, res, user };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
