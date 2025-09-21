import { tmdb } from "./tmdb-service";

import { TmdbTvShow, TVSeasonVideosResponse } from "../types/tmdb.types";

import { TvShowsPaginatedResponse, TvShow } from "../types/tmdb-tv-shows.types";

export const getPopularTvShowsByGenre = async (genreId: number, page = 1) => {
  const res = await tmdb.get<TvShowsPaginatedResponse<TvShow>>("/discover/tv", {
    params: {
      with_genres: genreId,
      sort_by: "popularity.desc",
      page,
    },
  });
  return res.data;
};

export const getPopularTvShows = async (page = 1) => {
  const res = await tmdb.get<TvShowsPaginatedResponse<TvShow>>("/tv/popular", {
    params: { page },
  });
  return res.data;
};

export const getTrendingTvShows = async (
  timeWindow: "day" | "week" = "day",
  page = 1
): Promise<TvShowsPaginatedResponse<TvShow>> => {
  const res = await tmdb.get<TvShowsPaginatedResponse<TvShow>>(
    `/trending/tv/${timeWindow}`,
    {
      params: { page },
    }
  );
  return res.data;
};

export const getTvSeasonSeriesDetails = async (
  seriesId: number,
  seasonNumber: number
) => {
  const res = await tmdb.get<TVSeasonVideosResponse>(
    `/tv/${seriesId}/season/${seasonNumber}`
  );
  return res.data;
};

export const getTvShowDetails = async (seriesId: number) => {
  const res = await tmdb.get<TmdbTvShow>(`/tv/${seriesId}`);
  return res.data;
};

export const searchTvShows = async (query: string, page = 1) => {
  const res = await tmdb.get<TvShowsPaginatedResponse<TvShow>>("/search/tv", {
    params: { query, page },
  });
  return res.data;
};

export const getTvShowSeriesVideos = async (seriesId: number) => {
  const res = await tmdb.get<TVSeasonVideosResponse>(`/tv/${seriesId}/videos`);
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

export const getTvShowCast = async (seriesId: number) => {
  const res = await tmdb.get<TmdbTvShow>(`/tv/${seriesId}/credits`);
  return res.data;
};

export const getTvShowWatchProviders = async (seriesId: number) => {
  const res = await tmdb.get<TmdbTvShow>(`/tv/${seriesId}/watch/providers`);
  return res.data;
};
