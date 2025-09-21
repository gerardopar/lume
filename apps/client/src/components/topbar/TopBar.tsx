import React from "react";

import BellIcon from "@components/svgs/BellIcon";
import UserProfile from "@components/user-profile/UserProfile";
import UserProfilePicture from "@components/shared/UserProfilePicture";
import SuggestionsInput from "@components/SuggestionsInput/SuggestionsInput";

import { useAuth } from "../../hooks/useAuth";
import { useModal } from "../../stores/modals";
import { useCurrentUser } from "../../stores/user";

export const TopBar: React.FC = () => {
  const { isLoggedIn } = useCurrentUser();
  const { showAuth } = useAuth();
  const { open } = useModal();

  return (
    <header className="w-full sticky top-0 z-50 bg-lume-primary-dark pb-4 pt-4 mb-2">
      <div className="flex items-center justify-between gap-4">
        <SuggestionsInput />

        <div className="flex items-center gap-2">
          <div className="flex items-center p-[10px] rounded-full bg-lume-secondary-dark">
            <BellIcon className="w-5 h-5 text-lume-primary-light" />
          </div>
          <div
            role="button"
            className="rounded-full overflow-hidden bg-lume-secondary-dark h-[40px] w-[40px] flex justify-center items-center cursor-pointer"
            onClick={() => {
              if (isLoggedIn)
                open(<UserProfile />, {
                  modalBoxClassName: "max-w-[400px]",
                });
              else showAuth();
            }}
          >
            <UserProfilePicture />
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
