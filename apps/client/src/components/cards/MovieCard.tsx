import React from "react";
import { buildImageUrl, config } from "../../helpers/tmdb-image.helpers";
import type { TmdbMovie } from "@my/api";
import HeartIcon from "@components/svgs/HeartIcon";

export const MovieCard: React.FC<{ movie: TmdbMovie }> = ({ movie }) => {
  const { title, poster_path } = movie;

  const poster = buildImageUrl(config, "poster", poster_path!, "original");

  return (
    <div className="relative min-h-[320px] max-h-[320px] flex flex-col px-2 pt-2 pb-4 hover:bg-lume-secondary-dark rounded-2xl group transition-all duration-300">
      <div
        className={`
        relative h-[275px] w-[200px] rounded-2xl overflow-hidden shadow-lg group
        bg-cover bg-center
      `}
        style={{ backgroundImage: `url(${poster})` }}
      >
        <button className="absolute top-2 right-2 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 hover:bg-lume-primary p-1.5">
          <HeartIcon className="w-4 h-4" />
        </button>
        <div
          className="
          absolute inset-0 bg-gradient-to-b from-black/25 to-black/25
          transition-opacity duration-300
          group-hover:opacity-0
        "
        />
      </div>

      <div className="mt-2 pb-2 pl-1">
        <h2 className="text-white font-poppins font-[200] text-sm line-clamp-2">
          {title}
        </h2>
      </div>
    </div>
  );
};

export default MovieCard;
