import React from "react";
import { trpc } from "@utils/trpc";

import MovieDetails from "@components/movie/MovieDetails";
import TvShowDetails from "@components/tv/TvShowDetails";

const MediaWrapper: React.FC<{ tmdbId: number; mediaType: "movie" | "tv" }> = ({
  tmdbId,
  mediaType,
}) => {
  const { data: movieData } = trpc.movies.getMovieDetails.useQuery({
    movieId: tmdbId,
  });

  const { data: tvData } = trpc.tvShows.getTvShowDetails.useQuery({
    seriesId: tmdbId,
  });

  if (mediaType === "movie" && movieData) {
    return <MovieDetails movie={movieData.details} />;
  }

  if (mediaType === "tv" && tvData) {
    return <TvShowDetails tvShow={tvData.details} />;
  }

  return <></>;
};

export default MediaWrapper;
