import { tmdb } from "./tmdb-service";

import { TmdbTvShow, TVSeasonVideosResponse } from "../types/tmdb.types";

import { TmdbPaginatedResponse } from "../validators/movies.validators";

export const searchTvShows = async (query: string, page = 1) => {
  const res = await tmdb.get<TmdbPaginatedResponse<TmdbTvShow>>("/search/tv", {
    params: { query, page },
  });
  return res.data;
};

export const getTvSeasonVideos = async (
  seriesId: number,
  seasonNumber: number
) => {
  const res = await tmdb.get<TVSeasonVideosResponse>(
    `/tv/${seriesId}/season/${seasonNumber}/videos`
  );
  return res.data;
};
