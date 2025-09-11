import React from "react";

import { buildImageUrl, config } from "../../helpers/tmdb-image.helpers";

import { trpc } from "@utils/trpc";

export const Hero: React.FC = () => {
  const { data } = trpc.movies.getPopularMovies.useQuery({
    page: 1,
  });

  const movie = data?.results[0];

  const poster = buildImageUrl(
    config,
    "backdrop",
    movie?.backdrop_path!,
    "original"
  );

  return (
    <div className="h-[40%] w-full rounded-2xl overflow-hidden">
      <img
        src={poster!}
        alt="backdrop"
        className="w-full h-full object-cover object-center"
      />
    </div>
  );
};

export default Hero;
