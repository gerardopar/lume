import React from "react";

export const CardActionsMenuSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col w-full items-center gap-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center gap-2 px-4 py-2 bg-lume-secondary-dark/60 rounded-lg animate-pulse"
        >
          <div className="h-4 w-4 rounded bg-gray-500/70" />
          <div className="h-3 w-20 rounded bg-gray-600" />
        </div>
      ))}
    </div>
  );
};

export default CardActionsMenuSkeleton;
