import React from "react";

import UserProfilePicture from "../shared/UserProfilePicture";

export const UserProfile: React.FC = () => {
  return (
    <div className="w-full">
      <h1 className="font-inter font-bold text-2xl text-lume-primary-light">
        Your Profile
      </h1>
      <p className="font-poppins text-sm text-lume-secondary-light font-[200]">
        View and personalize your profile.
      </p>

      <div className="mt-4 flex items-center justify-center">
        <UserProfilePicture showEditButton containerClassName="w-24 h-24" />
      </div>
    </div>
  );
};

export default UserProfile;
