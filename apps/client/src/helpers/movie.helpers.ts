import type { TmdbMovie } from "@my/api";

import { GENRES } from "../const/genres";

export const getRandomMovie = (movies: TmdbMovie[]): TmdbMovie | undefined => {
  if (!movies || !movies.length) return undefined;
  const moviesWIthBackdropPath = movies.filter((movie) => movie.backdrop_path);
  const randomIndex = Math.floor(Math.random() * moviesWIthBackdropPath.length);
  return moviesWIthBackdropPath[randomIndex];
};

export const getGenres = (movie: TmdbMovie, limit?: number) => {
  const genres = movie.genre_ids.map(
    (id) => GENRES.find((genre) => genre.id === id)?.name
  );
  return genres.slice(0, limit);
};
