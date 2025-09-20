import React, { useState } from "react";

import CardActionsMenuButton from "@components/card-actions-menu/CardActionsMenuButton";
import CardActionsMenu from "@components/card-actions-menu/CardActionsMenu";
import FavoritesButton from "@components/shared/FavoritesButton";
import TvShowDetails from "../../tv/TvShowDetails";

import { useModal, ModalTypesEnum } from "../../../stores/modals";

import { buildImageUrl, config } from "../../../helpers/tmdb-image.helpers";
import type { TmdbTvShow, MediaItemSnapshot } from "@my/api";

export const TvShowCard: React.FC<{ tvShow: TmdbTvShow }> = ({ tvShow }) => {
  const { open } = useModal();

  const [showMenu, setShowMenu] = useState(false);
  const [isCardActive, setIsCardActive] = useState<boolean>(false);

  const { name, poster_path } = tvShow;

  const poster = buildImageUrl(config, "poster", poster_path!, "original");

  const snapshot: MediaItemSnapshot = {
    tmdbId: tvShow.id,
    mediaType: "tv",
    title: tvShow.name,
    posterPath: tvShow?.poster_path || "",
    releaseDate: tvShow.first_air_date,
    overview: tvShow.overview,
    voteAverage: tvShow.vote_average,
    genreIds: tvShow.genre_ids,
  };

  return (
    <div
      onClick={() =>
        open(<TvShowDetails tvShow={tvShow} />, {
          type: ModalTypesEnum.Bottom,
          modalBoxClassName: "p-0",
        })
      }
      onMouseEnter={() => setIsCardActive(true)}
      onMouseLeave={() => setIsCardActive(false)}
      role="button"
      className="cursor-pointer relative min-h-[340px] max-h-[320px] max-w-[200px] w-[200px] flex flex-col px-2 pt-2 pb-4 hover:bg-lume-secondary-dark rounded-2xl group transition-all duration-300"
    >
      <div
        className={`
        relative min-h-[275px] w-[180px] rounded-2xl overflow-hidden shadow-lg group
        bg-cover bg-center
      `}
        style={{ backgroundImage: `url(${poster})` }}
      >
        <FavoritesButton
          isEnabled={isCardActive}
          tmdbId={tvShow.id}
          snapshot={snapshot}
          className={`
            absolute top-2 right-2 rounded-full flex items-center justify-center opacity-0 
            group-hover:opacity-100 transition-opacity duration-300 bg-black/50 hover:bg-lume-primary p-1.5 
            z-10 cursor-pointer h-[36px] w-[36px] min-h-[36px] min-w-[36px]`}
        />
        <div
          className="
          absolute inset-0 bg-gradient-to-b from-black/25 to-black/25
          transition-opacity duration-300
          group-hover:opacity-0
        "
        />

        {showMenu && (
          <CardActionsMenu
            isInline
            handleCloseInline={() => setShowMenu(false)}
            cardItemId={tvShow.id}
            snapshot={snapshot}
          />
        )}
      </div>

      <div className="mt-2 pb-2 flex items-start justify-between">
        <h2 className="text-white font-poppins font-[200] text-sm line-clamp-2">
          {name}
        </h2>

        <CardActionsMenuButton onClick={() => setShowMenu(!showMenu)} />
      </div>
    </div>
  );
};

export default TvShowCard;
