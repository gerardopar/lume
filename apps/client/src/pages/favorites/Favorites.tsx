import React from "react";
import { trpc } from "@utils/trpc";

import MainLayout from "../../layout/MainLayout";
import MovieCard from "@components/cards/MovieCard";
import TvShowCard from "@components/cards/tv/TvShowCard";
import FavoritesPlaceholder from "../../components/empty-states/FavoritesPlaceholder";

import { normalizeSnapshot } from "../../helpers/snapshot.helpers";

import type { TmdbMovie, TmdbTvShow, MediaItemSnapshot } from "@my/api";

export const Favorites: React.FC = () => {
  const { data: favorites, isLoading: favoritesLoading } =
    trpc.favorites.getFavoriteItemsByUser.useQuery();

  const favoritesList = favorites ?? [];

  return (
    <MainLayout>
      <div className="w-full mt-6">
        <h1 className="font-inter font-bold text-4xl text-lume-primary-light">
          My Favorites
        </h1>
        <div className="mt-4 divider" />

        {!favoritesLoading && favoritesList.length === 0 && (
          <FavoritesPlaceholder />
        )}

        {!favoritesLoading && favoritesList.length > 0 && (
          <div className="flex flex-wrap gap-4 mt-6">
            {favoritesList.map((favorite: MediaItemSnapshot) => {
              const normalizedFavorite = normalizeSnapshot(favorite);

              if (favorite.mediaType === "movie") {
                return (
                  <MovieCard
                    key={`fav-movie-${favorite.tmdbId}`}
                    movie={normalizedFavorite as TmdbMovie}
                  />
                );
              }
              if (favorite.mediaType === "tv") {
                return (
                  <TvShowCard
                    key={`fav-tv-${favorite.tmdbId}`}
                    tvShow={normalizedFavorite as TmdbTvShow}
                  />
                );
              }
              return null;
            })}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Favorites;
