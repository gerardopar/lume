import axios from "axios";
import { env } from "../../env";

import {
  TmdbMovie,
  TmdbPaginatedResponse,
  TmdbKeywordSearchResponse,
  MultiSearchResult,
  FilterOptionEnum,
} from "../types/tmdb.types";
import { TmdbMovieDetails } from "../validators/movies-details.validators";

import { MovieVideosResponse } from "../types/tmdb.types";
import { searchTvShows } from "./tmdb-tv-shows-service";

export const TMDB_API_URL = "https://api.themoviedb.org/3";

export const tmdb = axios.create({
  baseURL: TMDB_API_URL,
  headers: {
    Authorization: env.TMDB_API_KEY,
    Accept: "application/json",
  },
});

export const getPopularMoviesByGenre = async (genreId: number, page = 1) => {
  const res = await tmdb.get<TmdbPaginatedResponse<TmdbMovie>>(
    "/discover/movie",
    {
      params: {
        with_genres: genreId,
        sort_by: "popularity.desc",
        include_video: true,
        page,
      },
    }
  );
  return res.data;
};

export const getMovieDetails = async (
  movieId: number
): Promise<TmdbMovieDetails> => {
  const res = await tmdb.get(`/movie/${movieId}`);
  return res.data;
};

export const getPopularMovies = async (page: number = 1) => {
  const res = await tmdb.get<TmdbPaginatedResponse<TmdbMovie>>(
    "/movie/popular",
    {
      params: {
        page,
      },
    }
  );
  return res.data;
};

export const getTopRatedMovies = async (page: number = 1) => {
  const res = await tmdb.get<TmdbPaginatedResponse<TmdbMovie>>(
    "/movie/top_rated",
    { params: { page } }
  );
  return res.data;
};

export const getUpcomingMovies = async (page = 1) => {
  const res = await tmdb.get<TmdbPaginatedResponse<TmdbMovie>>(
    "/movie/upcoming",
    { params: { page } }
  );
  return res.data;
};

export const getNowPlayingMovies = async (page = 1) => {
  const res = await tmdb.get<TmdbPaginatedResponse<TmdbMovie>>(
    "/movie/now_playing",
    { params: { page } }
  );
  return res.data;
};

export const searchKeywords = async (query: string, page = 1) => {
  const res = await tmdb.get<TmdbKeywordSearchResponse>("/search/keyword", {
    params: { query, page },
  });
  return res.data;
};

export const searchMovies = async (query: string, page = 1) => {
  const res = await tmdb.get<TmdbPaginatedResponse<TmdbMovie>>(
    "/search/movie",
    { params: { query, page } }
  );
  return res.data;
};

export const searchMulti = async (query: string, page = 1) => {
  const res = await tmdb.get<TmdbPaginatedResponse<MultiSearchResult>>(
    "/search/multi",
    { params: { query, page } }
  );

  // filter out person results
  let results = res.data.results.filter(
    (result) => result.media_type !== "person"
  );

  // sort movies first, then tv shows
  results = results.sort((a, b) => {
    if (a.media_type === b.media_type) return 0;
    if (a.media_type === "movie") return -1;
    if (b.media_type === "movie") return 1;
    return 0;
  });

  return {
    ...res.data,
    results,
  };
};
export const tmdbSearch = async (
  query: string,
  page: number = 1,
  filter?: FilterOptionEnum
) => {
  if (filter === FilterOptionEnum.All) {
    return searchMulti(query, page);
  } else if (filter === FilterOptionEnum.Movies) {
    return searchMovies(query, page);
  } else if (filter === FilterOptionEnum.TV) {
    return searchTvShows(query, page);
  }

  return searchMulti(query, page);
};

export const getMovieVideos = async (movieId: number) => {
  const res = await tmdb.get<MovieVideosResponse>(`/movie/${movieId}/videos`);
  return res.data;
};

export const getMovieCast = async (movieId: number) => {
  const res = await tmdb.get<TmdbMovieDetails>(`/movie/${movieId}/credits`);
  return res.data;
};

export const getMovieWatchProviders = async (movieId: number) => {
  const res = await tmdb.get<TmdbMovieDetails>(
    `/movie/${movieId}/watch/providers`
  );
  return res.data;
};
