import React from "react";

import ThreeDotIcon from "@components/svgs/ThreeDotIcon";

import { useAuth } from "../../hooks/useAuth";
import { useCurrentUser } from "../../stores/user";

const CardActionsMenuButton: React.FC<{
  onClick: () => void;
  className?: string;
}> = ({ onClick, className }) => {
  const { isLoggedIn } = useCurrentUser();
  const { showAuth } = useAuth();

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        if (!isLoggedIn) {
          showAuth();
          return;
        }
        onClick();
      }}
      type="button"
      className={`cursor-pointer ${className}`}
    >
      <ThreeDotIcon className="w-4 h-4 text-white" />
    </button>
  );
};

export default CardActionsMenuButton;
