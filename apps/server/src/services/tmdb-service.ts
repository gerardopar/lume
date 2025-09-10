import axios from "axios";
import { env } from "../../env";

import { TmdbMovie, TmdbPaginatedResponse } from "../types/tmdb.types";

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
