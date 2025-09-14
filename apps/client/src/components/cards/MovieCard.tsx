import React from "react";

import HeartIcon from "@components/svgs/HeartIcon";
import MovieDetails from "../movie/MovieDetails";

import { useModal, ModalTypesEnum } from "../../stores/modals";

import { buildImageUrl, config } from "../../helpers/tmdb-image.helpers";
import type { TmdbMovie } from "@my/api";

export const MovieCard: React.FC<{ movie: TmdbMovie }> = ({ movie }) => {
  const { open } = useModal();

  const { title, poster_path } = movie;

  const poster = buildImageUrl(config, "poster", poster_path!, "original");

  return (
    <div
      onClick={() =>
        open(<MovieDetails movie={movie} />, {
          type: ModalTypesEnum.Bottom,
          modalBoxClassName: "p-0",
        })
      }
      role="button"
      className="relative min-h-[320px] max-h-[320px] flex flex-col px-2 pt-2 pb-4 hover:bg-lume-secondary-dark rounded-2xl group transition-all duration-300"
    >
      <div
        className={`
        relative h-[275px] w-[180px] rounded-2xl overflow-hidden shadow-lg group
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
