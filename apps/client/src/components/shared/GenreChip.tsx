import React from "react";

const GenreChip: React.FC<{ genre: string }> = ({ genre }) => {
  return (
    <span
      key={genre}
      className="shadow-lg text-xs inline px-4 py-1 rounded-full backdrop-blur-lg bg-white/10"
    >
      {genre}
    </span>
  );
};

export default GenreChip;
