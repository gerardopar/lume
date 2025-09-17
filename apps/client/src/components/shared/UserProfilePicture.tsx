import React, { useRef, useState } from "react";
import { trpc } from "@utils/trpc";
import _ from "lodash";

import UserIcon from "@components/svgs/UserIcon";
import CameraIcon from "@components/svgs/CameraIcon";
import ErrorToast from "@components/toast/ErrorToast";
import SuccessToast from "@components/toast/SuccessToast";

import { userStore } from "../../stores/user";
import { useToast, DEFAULT_TOAST_DURATION } from "../../stores/toasts";

export const UserProfilePicture: React.FC<{
  containerClassName?: string;
  imageWrapperClassName?: string;
  imageClassName?: string;
  iconClassName?: string;
  showEditButton?: boolean;
}> = ({
  containerClassName = "",
  imageWrapperClassName = "",
  imageClassName = "",
  iconClassName = "",
  showEditButton = false,
}) => {
  const { open } = useToast();
  const currentUser = userStore.useTracked("user");

  const { updateUser: updateUserStore } = userStore.actions;

  const {
    mutateAsync: getPresignedProfileUploadUrl,
    isPending: isGettingPresignedProfileUploadUrl,
  } = trpc.user.getPresignedProfileUploadUrl.useMutation();

  const { mutateAsync: updateUser, isPending: isUpdatingUser } =
    trpc.user.updateUser.useMutation();

  const [isUploadingPicture, setIsUploadingPicture] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const photoURL = currentUser?.photoURL;

  const handleFileSelect = () => fileInputRef.current?.click();

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) return;

    const file = event.target.files[0];
    const contentType = file.type || "image/jpeg";
    const fileExtension = contentType.split("/")[1];

    try {
      setIsUploadingPicture(true);

      // Get presigned URL from backend
      const { uploadUrl, fileUrl } = await getPresignedProfileUploadUrl({
        contentType,
        fileExtension,
      });

      // Upload to S3
      const uploadRes = await fetch(uploadUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": contentType,
        },
      });

      if (!uploadRes.ok) {
        const text = await uploadRes.text();
        console.error("Upload failed:", text);
        open(<ErrorToast message={text} />, {
          duration: DEFAULT_TOAST_DURATION,
        });
        return;
      }

      // Update user record in DB with new profile picture URL
      await updateUser({ picture: fileUrl });
      // Update current user in store
      updateUserStore({ ...currentUser, photoURL: fileUrl });

      open(<SuccessToast message="Profile picture updated" />, {
        duration: DEFAULT_TOAST_DURATION,
      });
    } catch (err) {
      console.error("Upload error:", err);
      open(
        <ErrorToast
          message={err instanceof Error ? err.message : "Something went wrong"}
        />,
        { duration: DEFAULT_TOAST_DURATION }
      );
    } finally {
      setIsUploadingPicture(false);
      event.target.value = ""; // reset file input
    }
  };

  return (
    <div className={`avatar avatar-placeholder ${containerClassName}`}>
      <div
        className={`relative bg-lume-secondary-dark text-lume-primary-light rounded-full overflow-hidden ${imageWrapperClassName}`}
      >
        {photoURL ? (
          <img
            src={photoURL}
            alt="Profile"
            className={`w-full h-full object-cover ${imageClassName}`}
          />
        ) : (
          <UserIcon className={`w-5 h-5 ${iconClassName}`} />
        )}

        {/* Hidden file input */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={onFileChange}
          style={{ display: "none" }}
        />
      </div>

      {showEditButton && (
        <div
          onClick={handleFileSelect}
          className="absolute bottom-[-2px] right-[-2px] bg-lume-secondary-dark rounded-full flex items-center justify-center p-2 shadow-sm cursor-pointer"
        >
          <CameraIcon className="w-4 h-4" />
        </div>
      )}

      {isUploadingPicture ||
      isGettingPresignedProfileUploadUrl ||
      isUpdatingUser ? (
        <span className="ml-2 text-xs text-gray-400">Uploading...</span>
      ) : null}
    </div>
  );
};

export default UserProfilePicture;
