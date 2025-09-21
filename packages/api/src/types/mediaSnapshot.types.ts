export interface MediaItemSnapshot {
  tmdbId: number; // Unique TMDB ID
  mediaType: "movie" | "tv"; // Media type
  title: string; // Title of the movie/TV show
  posterPath?: string; // Optional poster path
  releaseDate?: string; // Optional release date (YYYY-MM-DD)
  overview?: string; // Optional description/overview
  voteAverage?: number; // TMDB rating (0–10)
  genreIds?: number[]; // Array of genre IDs
}
