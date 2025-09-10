import axios from "axios";
import { env } from "../../env";

import { TmdbMovie, TmdbPaginatedResponse } from "../types/tmdb.types";
import { TmdbMovieDetails } from "../validators/movies-details.validators";

const TMDB_API_URL = "https://api.themoviedb.org/3";

const tmdb = axios.create({
  baseURL: TMDB_API_URL,
  params: { api_key: env.TMDB_API_KEY },
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

export const searchMovies = async (query: string, page = 1) => {
  const res = await tmdb.get<TmdbPaginatedResponse<TmdbMovie>>(
    "/search/movie",
    { params: { query, page } }
  );
  return res.data;
};
