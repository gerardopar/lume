// Types
export interface TmdbConfiguration {
  images: {
    base_url: string;
    secure_base_url: string;
    backdrop_sizes: string[];
    logo_sizes: string[];
    poster_sizes: string[];
    profile_sizes: string[];
    still_sizes: string[];
  };
  change_keys: string[];
}

type ImageType = "backdrop" | "logo" | "poster" | "profile" | "still";

// Size map

const sizeMap = {
  backdrop: ["w300", "w780", "w1280", "original"] as const,
  logo: ["w45", "w92", "w154", "w185", "w300", "w500", "original"] as const,
  poster: ["w92", "w154", "w185", "w342", "w500", "w780", "original"] as const,
  profile: ["w45", "w185", "h632", "original"] as const,
  still: ["w92", "w185", "w300", "original"] as const,
};

// Configuration
export const config: TmdbConfiguration = {
  change_keys: [],
  images: {
    base_url: "http://image.tmdb.org/t/p/",
    secure_base_url: "https://image.tmdb.org/t/p/",
    backdrop_sizes: ["w300", "w780", "w1280", "original"],
    logo_sizes: ["w45", "w92", "w154", "w185", "w300", "w500", "original"],
    poster_sizes: ["w92", "w154", "w185", "w342", "w500", "w780", "original"],
    profile_sizes: ["w45", "w185", "h632", "original"],
    still_sizes: ["w92", "w185", "w300", "original"],
  },
};

// Build image URL
export function buildImageUrl<
  T extends ImageType,
  S extends (typeof sizeMap)[T][number]
>(
  config: TmdbConfiguration,
  type: T,
  path: string | null,
  size: S = "original" as S
): string | null {
  if (!path) return null;
  return `${config.images.secure_base_url}${size}${path}`;
}
