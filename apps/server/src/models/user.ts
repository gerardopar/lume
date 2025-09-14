import mongoose, { Document, Model, Schema } from "mongoose";

export interface User extends Document {
  firebaseUid: string;
  name?: string;
  bio?: string;
  picture?: string;
  email: string;
  username?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<User>(
  {
    firebaseUid: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: false,
      lowercase: true,
    },
    bio: {
      type: String,
      required: false,
      maxLength: 160,
    },
    picture: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    username: {
      type: String,
      required: false,
      lowercase: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export const User: Model<User> = mongoose.model<User>("User", UserSchema);
