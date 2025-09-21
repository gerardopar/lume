import React from "react";

import XIcon from "@components/svgs/XIcon";

export const CloseButton: React.FC<{
  className?: string;
  onClick?: () => void;
}> = ({ className, onClick }) => {
  return (
    <button
      type="button"
      className={`cursor-pointer ${className}`}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
    >
      <XIcon />
    </button>
  );
};

export default CloseButton;
