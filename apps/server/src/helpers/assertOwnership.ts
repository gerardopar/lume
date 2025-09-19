import { TRPCError } from "@trpc/server";
import { getUserByFirebaseUid } from "../accessLayer/user";

/**
 * Ensures the given resource belongs to the currently authenticated user.
 * @param ctx - TRPC context with Firebase user
 * @param resourceUserId - userId stored on the resource
 */
export const assertOwnership = async (ctx: any, resourceUserId: string) => {
  const user = await getUserByFirebaseUid(ctx.user?.uid!);

  if (!user?._id) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "User not found",
    });
  }

  if (user._id.toString() !== resourceUserId.toString()) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "You do not have permission to modify this resource",
    });
  }

  return user;
};

export default assertOwnership;
