import React from "react";

export const WatchProvidersListSkeleton: React.FC<{
  count?: number;
  className?: string;
}> = ({ count = 5, className }) => {
  return (
    <div className={`avatar-group -space-x-4 animate-pulse ${className}`}>
      {[...Array(count)].map((_, idx) => (
        <div key={idx} className="avatar border-[1px]">
          <div className="w-10 h-10 rounded-full bg-gray-600" />
        </div>
      ))}
    </div>
  );
};

export default WatchProvidersListSkeleton;
