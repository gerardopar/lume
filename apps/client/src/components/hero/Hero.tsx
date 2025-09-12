import React, { useMemo } from "react";
import { trpc } from "@utils/trpc";

import HeroBg from "./HeroBg";
import HeroSkeleton from "@components/skeleton/HeroSkeleton";

import { buildImageUrl, config } from "../../helpers/tmdb-image.helpers";
import { getRandomMovie, getGenres } from "../../helpers/movie.helpers";

export const Hero: React.FC = () => {
  const { data, isLoading } = trpc.movies.getPopularMovies.useQuery({
    cursor: 1,
  });

  const movie = useMemo(() => getRandomMovie(data?.results ?? []), [data]);
  const { title, overview, backdrop_path } = movie ?? {};

  const genres = useMemo(() => getGenres(movie!, 3), [movie]);
  const poster = useMemo(
    () => buildImageUrl(config, "backdrop", backdrop_path!, "original"),
    [backdrop_path]
  );

  if (isLoading) return <HeroSkeleton />;

  return (
    <div className="relative h-[50%] min-h-[400px] w-full flex flex-col rounded-2xl overflow-hidden p-6">
      <HeroBg poster={poster!} />

      {/* Overlay content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Top right badge */}
        <div className="w-full flex items-center justify-end">
          <div className="shadow-lg text-base inline px-6 py-2 rounded-full backdrop-blur-lg bg-white/10">
            Now Playing
          </div>
        </div>

        {/* Bottom content */}
        <div className="flex flex-col justify-end gap-2 h-full">
          <div className="flex items-center gap-2">
            {genres.map((genre) => (
              <span
                key={genre}
                className="shadow-lg text-xs inline px-4 py-1 rounded-full backdrop-blur-lg bg-white/10"
              >
                {genre}
              </span>
            ))}
          </div>

          <h1 className="text-4xl font-bold font-inter text-white">{title}</h1>
          <p className="text-base font-poppins text-white font-[200] max-w-[40%] line-clamp-3">
            {overview}
          </p>

          <div className="flex items-center gap-2 mt-2">
            <button className="shadow-lg btn font-[400] bg-lume-primary-dark text-lume-primary-light rounded-full hover:bg-lume-primary-dark/50 hover:border-lume-primary-dark/50">
              Watch Trailer
            </button>
            <button className="shadow-lg btn btn-outline font-[400] rounded-full text-lume-primary-light hover:bg-lume-primary-light hover:text-lume-primary-dark hover:border-lume-primary-light">
              Add to Watchlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
