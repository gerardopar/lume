// Movie
export interface TmdbMovie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface TmdbPaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

// Keyword Search
export interface TmdbKeywordSearchResponse {
  page: number;
  results: TmdbKeywordSearchResponseResult[];
  total_pages: number;
  total_results: number;
}

export interface TmdbKeywordSearchResponseResult {
  id: number;
  name: string;
}

// TV Show
export interface TmdbTvShow {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string; // YYYY-MM-DD
  origin_country: string[]; // country codes
  genre_ids: number[];
  vote_count: number;
  vote_average: number;
  popularity: number;
  original_language: string;
}

// TV Show Search
export interface TmdbTvShowSearchResponse {
  page: number;
  results: TmdbTvShow[];
  total_results: number;
  total_pages: number;
}

// multi search

// Possible media types in the “multi” search results
export type MediaType = "movie" | "tv" | "person";

// Common fields for all result types
interface BaseSearchResult {
  id: number;
  media_type: MediaType;
  popularity: number;
  backdrop_path: string | null;
  poster_path?: string | null;
}

// Movie-specific fields
export interface MovieSearchResult extends BaseSearchResult {
  media_type: "movie";
  title: string;
  original_title: string;
  release_date: string | null;
  overview: string;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  vote_average: number;
  vote_count: number;
  video?: boolean;
}

// TV-specific fields
export interface TvSearchResult extends BaseSearchResult {
  media_type: "tv";
  name: string;
  original_name: string;
  first_air_date: string | null;
  origin_country: string[];
  overview: string;
  genre_ids: number[];
  original_language: string;
  vote_average: number;
  vote_count: number;
}

// Person-specific fields
export interface PersonSearchResult extends BaseSearchResult {
  media_type: "person";
  name: string;
  profile_path: string | null;
  known_for: Array<MovieSearchResult | TvSearchResult>;
  // known_for_department?: string;
}

// The union type for any result from multi search
export type MultiSearchResult =
  | MovieSearchResult
  | TvSearchResult
  | PersonSearchResult;

export interface MultiSearchResponse {
  page: number;
  results: MultiSearchResult[];
  total_results: number;
  total_pages: number;
}
