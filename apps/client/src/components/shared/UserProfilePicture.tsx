import React from "react";
import _ from "lodash";

import UserIcon from "@components/svgs/UserIcon";

import { useCurrentUser } from "../../stores/user";

export const UserProfilePicture: React.FC = () => {
  const currentUser = useCurrentUser();

  const photoURL = _.get(currentUser, "photoURL", undefined);

  return (
    <div className="avatar avatar-placeholder">
      <div className="bg-lume-secondary-dark text-lume-primary-light w-12 rounded-full overflow-hidden">
        {photoURL ? (
          <img
            src={photoURL}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <UserIcon className="w-5 h-5" />
        )}
      </div>
    </div>
  );
};

export default UserProfilePicture;
