import React from "react";

export const CardSkeleton: React.FC = () => {
  return (
    <div className="relative min-h-[320px] max-h-[320px] flex flex-col px-2 pt-2 pb-4 rounded-2xl animate-pulse">
      <div className="relative h-[275px] w-[180px] rounded-2xl overflow-hidden bg-gray-600 shadow-lg">
        <div className="absolute top-2 right-2 h-7 w-7 rounded-full bg-gray-500/70" />
      </div>

      <div className="mt-2 pb-2 pl-1">
        <div className="h-4 w-3/4 rounded bg-gray-600" />
      </div>
    </div>
  );
};

export default CardSkeleton;
