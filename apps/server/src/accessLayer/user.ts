import { TRPCError } from "@trpc/server";
import { UserRecord } from "firebase-admin/auth";

import { User } from "../models/user";

import { updateFirebaseUser } from "../firebase/firebase.helpers";

export const getUserById = async (id: string) => {
  try {
    const user = await User.findById(id).exec();
    return user;
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Unable to get user",
    });
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const user = await User.findOne({ email }).exec();
    return user;
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Unable to get user",
    });
  }
};

export const getUserByFirebaseUid = async (firebaseUid: string) => {
  try {
    const user = await User.findOne({ firebaseUid }).exec();
    return user;
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Unable to get user",
    });
  }
};

export const createUser = async ({
  email,
  name,
  firebaseUid,
  picture,
}: {
  email: string;
  name?: string;
  firebaseUid: string;
  picture?: string;
}) => {
  try {
    const newUser = await User.create({ email, name, firebaseUid, picture });
    return newUser;
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Unable to create user",
    });
  }
};

export const updateUser = async (firebaseUid: string, user: Partial<User>) => {
  try {
    const updatedUser = await User.findOneAndUpdate({ firebaseUid }, user, {
      new: true,
    }).exec();

    const firebaseUpdates: Partial<UserRecord> = {
      email: updatedUser?.email || undefined,
      displayName: updatedUser?.name || undefined,
      photoURL: updatedUser?.picture || undefined,
    };

    await updateFirebaseUser(firebaseUid, firebaseUpdates as UserRecord);
    return updatedUser;
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Unable to update user",
    });
  }
};

export const deleteUser = async (id: string) => {
  try {
    const deletedUser = await User.findByIdAndDelete(id).exec();
    return deletedUser;
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Unable to delete user",
    });
  }
};
