import React from "react";

import { buildImageUrl, config } from "../../helpers/tmdb-image.helpers";

import type { TmdbMovie } from "@my/api";

export const MovieCard: React.FC<{ movie: TmdbMovie }> = ({ movie }) => {
  const poster = buildImageUrl(
    config,
    "poster",
    movie.poster_path!,
    "original"
  );

  return (
    <div
      className="h-[275px] w-[200px] rounded-2xl overflow-hidden shadow-lg"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)),url(${poster})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    ></div>
  );
};

export default MovieCard;
