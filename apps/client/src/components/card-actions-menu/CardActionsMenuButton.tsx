import React from "react";

import ThreeDotIcon from "@components/svgs/ThreeDotIcon";

const CardActionsMenuButton: React.FC<{ onClick: () => void }> = ({
  onClick,
}) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      type="button"
      className="cursor-pointer"
    >
      <ThreeDotIcon className="w-4 h-4 text-white" />
    </button>
  );
};

export default CardActionsMenuButton;
