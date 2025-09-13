import React from "react";

export const CheckmarkIcon: React.FC<{
  className?: string;
  strokeWidth?: string;
}> = ({ className, strokeWidth }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M20 6L9 17L4 12"
        stroke="white"
        strokeWidth={strokeWidth ?? "2"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CheckmarkIcon;
