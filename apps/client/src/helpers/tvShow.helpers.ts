import type { TmdbTvShow } from "@my/api";

import { TV_GENRES } from "../const/genres";

export const getRandomTvShow = (
  movies: TmdbTvShow[]
): TmdbTvShow | undefined => {
  if (!movies || !movies.length) return undefined;
  const tvShowsWithBackdropPath = movies?.filter(
    (movie) => movie?.backdrop_path
  );
  const randomIndex = Math.floor(
    Math.random() * tvShowsWithBackdropPath?.length
  );
  return tvShowsWithBackdropPath?.[randomIndex];
};

export const getTvShowGenres = (movie: TmdbTvShow, limit?: number) => {
  if (!movie || !movie?.genre_ids?.length) return [];
  const genres = movie?.genre_ids?.map(
    (id) => TV_GENRES.find((genre) => genre?.id === id)?.name
  );
  return genres?.slice(0, limit);
};
