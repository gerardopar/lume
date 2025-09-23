import React, { useMemo } from "react";
import _ from "lodash";
import { trpc } from "@utils/trpc";

import VideoPlayer from "../video/VideoPlayer";
import CastList from "@components/cast/CastList";
import GenreChip from "@components/shared/GenreChip";
import GenreChipSkeleton from "@components/skeleton/GenreChipSkeleton";
import WatchProvidersList from "@components/watch-providers/WatchProvidersList";

import { buildImageUrl, config } from "../../helpers/tmdb-image.helpers";
import { getGenres } from "../../helpers/movie.helpers";

import type { TmdbMovie } from "@my/api";

export const MovieDetails: React.FC<{ movie: TmdbMovie }> = ({ movie }) => {
  const { data, isLoading } = trpc.movies.getMovieDetails.useQuery({
    movieId: movie.id,
  });

  const { title, overview, poster_path, backdrop_path } = movie;
  const movieGenres = useMemo(() => getGenres(movie!, 3), [movie]);

  const posterPath = buildImageUrl(config, "poster", poster_path!, "original");
  const backdropPath = buildImageUrl(
    config,
    "backdrop",
    backdrop_path!,
    "original"
  );

  const videos = data?.videos?.results ?? [];
  const cast = data?.credits?.cast ?? [];
  const watchProviders = data?.watchProviders?.results?.US ?? {};

  const trailer = videos?.find(
    (v) => v.type === "Trailer" && v.site === "YouTube"
  );

  return (
    <div className="relative w-full overflow-hidden bg-lume-primary-dark">
      {/* Right-side trailer or fallback backdrop */}
      <div className="absolute right-0 top-0 w-1/2 max-mobile-425:w-full max-mobile-375:w-full h-full z-0 overflow-hidden">
        {trailer && <VideoPlayer videoKey={trailer.key} />}
        {!trailer && backdropPath && (
          <img
            src={backdropPath!}
            alt={movie.title}
            className="object-cover w-full h-full"
          />
        )}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-10" />

      {/* Content on left */}
      <div className="w-full relative z-20 flex items-center p-6 h-full">
        <div className="w-[200px] h-[300px] min-h-[300px] min-w-[200px] rounded-2xl overflow-hidden shadow-lg max-mobile-768:hidden">
          <img
            src={posterPath!}
            alt={movie.title}
            className="object-cover w-full h-full"
          />
        </div>

        <div className="flex w-full flex-col ml-6 max-mobile-768:ml-0 gap-4">
          <div className="flex items-center gap-2">
            {isLoading ? (
              <GenreChipSkeleton count={3} />
            ) : (
              movieGenres.map((genre) => <GenreChip genre={genre!} />)
            )}
          </div>
          <h1 className="text-4xl font-bold font-inter text-white max-mobile-768:text-2xl">
            {title}
          </h1>
          <p className="text-base font-poppins text-white/80 font-[200] max-w-[50%] max-mobile-768:max-w-[75%] max-mobile-768:text-sm">
            {overview}
          </p>
          <div className="flex space-x-8">
            <CastList cast={cast} isLoading={isLoading} />
            <div className="divider divider-horizontal h-full m-0" />
            <WatchProvidersList
              watchProviders={watchProviders}
              isLoading={isLoading}
              className="ml-8"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
