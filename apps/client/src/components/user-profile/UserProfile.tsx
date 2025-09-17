import React from "react";

import UserProfilePicture from "../shared/UserProfilePicture";
import UserProfileUpdateForm from "./UserProfileUpdateForm";
import CloseButton from "@components/shared/CloseButton";

import { useModal } from "../../stores/modals";

export const UserProfile: React.FC = () => {
  const { close } = useModal();

  return (
    <div className="w-full">
      <CloseButton onClick={close} className="absolute top-4 right-4" />
      <h1 className="font-inter font-bold text-2xl text-lume-primary-light">
        Your Profile
      </h1>
      <p className="font-poppins text-sm text-lume-secondary-light font-[200]">
        View and personalize your profile.
      </p>

      <div className="mt-4 flex items-center justify-center">
        <UserProfilePicture showEditButton containerClassName="w-24 h-24" />
      </div>

      <UserProfileUpdateForm />
    </div>
  );
};

export default UserProfile;
