import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { protectedProcedure, publicProcedure, router } from "../trpc";

import {
  getUserByFirebaseUid,
  createUser,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
} from "../accessLayer/user";

import { User } from "../models/user";

import { getProfileUploadUrl } from "../aws/s3.helpers";
import { deleteFirebaseUser } from "../firebase/firebase.helpers";
import { userSchema } from "../validators/user";

export const userRouter = router({
  createUser: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        name: z.string().optional(),
        firebaseUid: z.string(),
        picture: z.string().optional(),
      })
    )
    .output(z.object({ user: userSchema }))
    .mutation(async ({ input }) => {
      try {
        let user = await getUserByFirebaseUid(input.firebaseUid);

        if (!user) user = await createUser(input);

        return { user };
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error creating user",
          cause: error,
        });
      }
    }),
  getUserById: protectedProcedure
    .input(z.string())
    .output(userSchema)
    .query(async ({ input }) => {
      try {
        const user = await getUserById(input);
        if (!user)
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "User not found",
          });
        return user;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error getting user by id",
          cause: error,
        });
      }
    }),
  getUserByEmail: protectedProcedure
    .input(z.string())
    .output(userSchema)
    .query(async ({ input }) => {
      try {
        const user = await getUserByEmail(input);
        if (!user)
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "User not found",
          });
        return user;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error getting user by email",
          cause: error,
        });
      }
    }),
  getUserByFirebaseUid: protectedProcedure
    .input(z.string())
    .output(userSchema)
    .query(async ({ input }) => {
      try {
        const user = await getUserByFirebaseUid(input);
        if (!user)
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "User not found",
          });
        return user;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error getting user by firebase uid",
          cause: error,
        });
      }
    }),
  getLoggedInUser: protectedProcedure
    .output(userSchema)
    .query(async ({ ctx }) => {
      try {
        const user = await getUserByFirebaseUid(ctx.user?.uid!);

        if (!user)
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "User not found",
          });
        return user;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error getting logged in user",
          cause: error,
        });
      }
    }),
  updateUser: protectedProcedure
    .input(
      z.object({
        name: z.string().optional(),
        username: z.string().optional(),
        bio: z.string().optional(),
        picture: z.string().optional(),
      })
    )
    .output(userSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const user = await updateUser(ctx.user?.uid!, input);
        if (!user)
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "User not found",
          });
        return user;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error updating user",
          cause: error,
        });
      }
    }),
  deleteUser: protectedProcedure
    .output(userSchema)
    .mutation(async ({ ctx }) => {
      try {
        const firebaseUid = ctx.user?.uid!;
        const user = await getUserByFirebaseUid(firebaseUid);

        if (!user)
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "User not found",
          });

        await deleteUser(user?._id?.toString()!);
        await deleteFirebaseUser(firebaseUid);

        return user;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error deleting user",
          cause: error,
        });
      }
    }),
  getPresignedProfileUploadUrl: protectedProcedure
    .input(
      z.object({
        contentType: z.string(),
        fileExtension: z.string(),
      })
    )
    .output(z.object({ uploadUrl: z.string(), fileUrl: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await getProfileUploadUrl(
        ctx?.user?.uid!,
        input?.contentType!,
        input?.fileExtension!
      );
    }),
});
