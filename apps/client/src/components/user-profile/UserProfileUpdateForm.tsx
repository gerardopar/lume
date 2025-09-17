import React, { useEffect, useState } from "react";
import { trpc } from "@utils/trpc";
import { z } from "zod";

import SuccessToast from "@components/toast/SuccessToast";
import ErrorToast from "@components/toast/ErrorToast";

import { useToast, DEFAULT_TOAST_DURATION } from "../../stores/toasts";
import { userStore } from "../../stores/user";

const schema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  bio: z
    .string()
    .max(240, "Bio must be at most 240 characters long")
    .optional(),
});

export const UserProfileUpdateForm: React.FC = () => {
  const { open } = useToast();

  const { data, isLoading } = trpc.user.getLoggedInUser.useQuery();
  const { mutateAsync: updateUser, isPending: isUpdating } =
    trpc.user.updateUser.useMutation();

  const { updateUser: updateUserStore } = userStore.actions;

  const [bio, setBio] = useState<string>(data?.bio || "");
  const [name, setName] = useState<string>(data?.name || "");

  const [errors, setErrors] = useState<{
    name?: string;
    bio?: string;
  }>({});

  useEffect(() => {
    if (data && !isLoading) {
      setName(data?.name || "");
      setBio(data?.bio || "");
    }
  }, [data, isLoading]);

  const validate = () => {
    const result = schema.safeParse({ name, bio });

    if (!result.success) {
      const formatted = result.error.flatten().fieldErrors;
      setErrors({
        name: formatted.name?.[0],
        bio: formatted.bio?.[0],
      });
      return false;
    }

    setErrors({});
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await updateUser(
        { name, bio },
        {
          onSuccess: () => {
            updateUserStore({ displayName: name });
            open(<SuccessToast message="Profile updated successfully" />, {
              duration: DEFAULT_TOAST_DURATION,
            });
          },
          onError: (error) => {
            console.error(error);
            open(<ErrorToast message="Error updating profile" />, {
              duration: DEFAULT_TOAST_DURATION,
            });
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4 w-full">
        <p className="mb-2 font-poppins font-[400] text-sm pl-1">Name</p>
        <input
          type="name"
          placeholder="Name"
          onChange={(e) => {
            setErrors(() => ({
              ...errors,
              name: "",
            }));
            setName(e.target.value);
          }}
          className={`w-full text-sm p-2 border-lume-secondary-dark/90 border-[1px] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-lume-primary-dark font-poppins font-[200] pl-2 ${
            errors.name ? "border-red-400" : ""
          }`}
          value={name}
        />
        {errors.name && (
          <p className="text-red-400 pl-1 text-xs mt-1">{errors.name}</p>
        )}
      </div>
      <div className="mb-4 w-full">
        <p className="mb-2 font-poppins font-[400] text-sm pl-1">Bio</p>
        <textarea
          placeholder="Short bio"
          onChange={(e) => {
            setErrors(() => ({
              ...errors,
              bio: "",
            }));
            setBio(e.target.value);
          }}
          className={`w-full text-sm p-2 border-lume-secondary-dark/90 border-[1px] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-lume-primary-dark font-poppins font-[200] pl-2 ${
            errors?.bio ? "border-red-400" : ""
          }`}
          value={bio}
        />
        {errors?.bio && (
          <p className="text-red-400 pl-1 text-xs mt-1">{errors.bio}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading || isUpdating}
        className="bg-lume-green/90 text-white p-2 rounded-[10px] w-full cursor-pointer hover:bg-lume-green/60 transition-colors duration-200 ease-in-out"
      >
        {isUpdating ? "Updating..." : "Update"}
      </button>
    </form>
  );
};

export default UserProfileUpdateForm;
