export type MediaImagePath = string | null;

export type TvShow = {
  adult: boolean;
  backdrop_path: MediaImagePath;
  genre_ids: number[];
  id: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: MediaImagePath;
  first_air_date: string;
  name: string;
  vote_average: number;
  vote_count: number;
};

export type TvShowsPaginatedResponse<T> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};

export type TvResponse = TvShowsPaginatedResponse<TvShow>;
