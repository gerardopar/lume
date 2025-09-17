import React from "react";

import { useModal } from "../../stores/modals";
import DeleteUserProfile from "./DeleteUserProfile";

const DeleteUserProfileButton: React.FC = () => {
  const { open } = useModal();

  return (
    <button
      type="button"
      onClick={() =>
        open(<DeleteUserProfile />, { modalBoxClassName: "max-w-[400px]" })
      }
      className="border-red-400 border-[1px] text-red-400 p-2 rounded-[10px] w-full cursor-pointer transition-colors duration-[500ms] ease-in-out mt-2 hover:bg-red-400 hover:text-white"
    >
      Delete Account
    </button>
  );
};

export default DeleteUserProfileButton;
