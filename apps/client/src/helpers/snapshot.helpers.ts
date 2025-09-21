import type { MediaItemSnapshot, TmdbMovie, TmdbTvShow } from "@my/api";

export const normalizeSnapshots = (
  items: MediaItemSnapshot[]
): Partial<TmdbMovie | TmdbTvShow>[] => {
  const normalizedItems = items.map((item: MediaItemSnapshot) => {
    if (item.mediaType === "movie") {
      return {
        id: item.tmdbId,
        poster_path: item.posterPath,
        media_type: item.mediaType,
        title: item.title,
        release_date: item.releaseDate,
        overview: item.overview,
        vote_average: item.voteAverage,
        genre_ids: item.genreIds,
      };
    } else if (item.mediaType === "tv") {
      return {
        id: item.tmdbId,
        poster_path: item.posterPath,
        media_type: item.mediaType,
        name: item.title,
        first_air_date: item.releaseDate,
        overview: item.overview,
        vote_average: item.voteAverage,
        genre_ids: item.genreIds,
      };
    }
    return {};
  });

  return normalizedItems;
};

export const normalizeSnapshot = (
  item: MediaItemSnapshot
): Partial<TmdbMovie | TmdbTvShow> => {
  if (item.mediaType === "movie") {
    return {
      id: item.tmdbId,
      poster_path: item.posterPath,
      media_type: item.mediaType,
      title: item.title,
      release_date: item.releaseDate,
      overview: item.overview,
      vote_average: item.voteAverage,
      genre_ids: item.genreIds,
    };
  } else if (item.mediaType === "tv") {
    return {
      id: item.tmdbId,
      poster_path: item.posterPath,
      media_type: item.mediaType,
      name: item.title,
      first_air_date: item.releaseDate,
      overview: item.overview,
      vote_average: item.voteAverage,
      genre_ids: item.genreIds,
    };
  }
  return {};
};
