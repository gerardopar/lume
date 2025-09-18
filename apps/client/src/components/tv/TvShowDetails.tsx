import React from "react";
import { trpc } from "@utils/trpc";

import VideoPlayer from "../video/VideoPlayer";

import { buildImageUrl, config } from "../../helpers/tmdb-image.helpers";
import type { TmdbTvShow } from "@my/api";

export const TvShowDetails: React.FC<{ tvShow: TmdbTvShow }> = ({ tvShow }) => {
  const { name, overview, poster_path, backdrop_path } = tvShow;
  const posterPath = buildImageUrl(config, "poster", poster_path!, "original");
  const backdropPath = buildImageUrl(
    config,
    "backdrop",
    backdrop_path!,
    "original"
  );

  const { data: videos } = trpc.tvShows.getTvSeasonVideos.useQuery({
    seriesId: tvShow.id,
    seasonNumber: 1,
  });

  const trailer = videos?.results.find(
    (v) => v.type === "Trailer" && v.site === "YouTube"
  );

  return (
    <div className="relative w-full h-[500px] overflow-hidden bg-lume-primary-dark">
      {/* Right-side trailer or fallback backdrop */}
      <div className="absolute right-0 top-0 w-1/2 h-full z-0 overflow-hidden">
        {trailer && <VideoPlayer videoKey={trailer.key} />}
        {!trailer && backdropPath && (
          <img
            src={backdropPath!}
            alt={name}
            className="object-cover w-full h-full"
          />
        )}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-10" />

      {/* Content on left */}
      <div className="relative z-20 flex items-center p-6 h-full">
        <div className="w-[200px] h-[300px] min-h-[300px] min-w-[200px] rounded-2xl overflow-hidden shadow-lg">
          <img
            src={posterPath!}
            alt={name}
            className="object-cover w-full h-full"
          />
        </div>

        <div className="flex flex-col ml-6 gap-4">
          <h1 className="text-4xl font-bold font-inter text-white">{name}</h1>
          <p className="text-base font-poppins text-white/80 font-[200] max-w-[50%]">
            {overview}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TvShowDetails;
