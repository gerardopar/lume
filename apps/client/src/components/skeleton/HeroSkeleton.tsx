import React from "react";

export const HeroSkeleton: React.FC = () => {
  return (
    <div className="h-[50%] min-h-[400px] w-full flex flex-col rounded-2xl overflow-hidden p-6 bg-lume-secondary-dark animate-pulse">
      <div className="w-full flex items-center justify-end">
        <div className="h-6 w-28 rounded-full bg-gray-600" />
      </div>

      <div className="w-full h-full flex flex-col justify-end gap-2">
        <div className="flex items-center gap-2">
          {[...Array(3)].map((_, idx) => (
            <div key={idx} className="h-5 w-16 rounded-full bg-gray-600" />
          ))}
        </div>

        <div className="h-8 w-2/5 rounded-md bg-gray-600" />

        <div className="flex flex-col gap-2 mt-2 max-w-[40%]">
          <div className="h-4 w-full rounded bg-gray-600" />
          <div className="h-4 w-4/5 rounded bg-gray-600" />
          <div className="h-4 w-3/5 rounded bg-gray-600" />
        </div>

        <div className="flex items-center gap-2 mt-4">
          <div className="h-10 w-32 rounded-full bg-gray-600" />
          <div className="h-10 w-36 rounded-full bg-gray-600" />
        </div>
      </div>
    </div>
  );
};

export default HeroSkeleton;
