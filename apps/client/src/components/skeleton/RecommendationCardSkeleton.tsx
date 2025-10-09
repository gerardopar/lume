import React from "react";

export const RecommendationCardSkeleton: React.FC = () => {
  return (
    <div className="min-w-full w-full max-w-[400px] max-mobile-768:max-w-[400px] max-mobile-425:max-w-[90%] max-mobile-375:max-w-[90%] shrink-0 px-2">
      <div
        className={`
          h-[240px] bg-gray-700/40 relative flex flex-col items-start justify-end 
          p-4 rounded-2xl gap-2 overflow-hidden animate-pulse
        `}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-gray-600/20 to-gray-900/60" />

        <div className="absolute top-2 right-4 h-6 w-16 rounded-full bg-gray-500/50 backdrop-blur-sm" />

        <div className="w-3/4 h-5 bg-gray-500/80 rounded z-10" />

        <div className="w-full h-3 bg-gray-600/70 rounded z-10" />
        <div className="w-5/6 h-3 bg-gray-600/70 rounded z-10" />
        <div className="w-2/3 h-3 bg-gray-600/70 rounded z-10" />

        <div className="mt-3 h-8 w-24 bg-gray-500/60 rounded-full z-10" />
      </div>
    </div>
  );
};

export default RecommendationCardSkeleton;
