import React from "react";

export const GenreChipSkeleton: React.FC<{ count?: number }> = ({
  count = 3,
}) => {
  return (
    <div className="flex gap-2">
      {[...Array(count)].map((_, idx) => (
        <span
          key={idx}
          className="shadow-lg inline-block h-6 w-16 rounded-full bg-gray-600 animate-pulse"
        />
      ))}
    </div>
  );
};

export default GenreChipSkeleton;
