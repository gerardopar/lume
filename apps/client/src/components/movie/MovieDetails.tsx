import React from "react";

import { buildImageUrl, config } from "../../helpers/tmdb-image.helpers";

import type { TmdbMovie } from "@my/api";

export const MovieDetails: React.FC<{ movie: TmdbMovie }> = ({ movie }) => {
  const { title, overview, poster_path } = movie;
  const posterPath = buildImageUrl(config, "poster", poster_path!, "original");

  return (
    <div className="w-full bg-lume-primary-dark">
      <div className="w-full flex items-center justify-center p-6">
        <div className="min-w-[200px] min-h-[300px] max-w-[200px] max-h-[300px] h-[300px] w-[200px] rounded-2xl overflow-hidden">
          <img src={posterPath} alt={movie.title} className=" object-cover" />
        </div>

        <div className="flex flex-col items-start justify-center ml-6 gap-2">
          <h1 className="text-4xl font-bold font-inter text-white">{title}</h1>
          <p className="text-base font-poppins text-white font-[200] max-w-[40%] line-clamp-3">
            {overview}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
