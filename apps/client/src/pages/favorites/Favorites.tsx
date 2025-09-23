import React from "react";
import { trpc } from "@utils/trpc";

import MainLayout from "../../layout/MainLayout";
import MovieCard from "@components/cards/MovieCard";
import TvShowCard from "@components/cards/tv/TvShowCard";
import CardSkeleton from "@components/skeleton/CardSkeleton";
import FavoritesPlaceholder from "../../components/empty-states/FavoritesPlaceholder";

import { normalizeSnapshot } from "../../helpers/snapshot.helpers";

import type { TmdbMovie, TmdbTvShow, MediaItemSnapshot } from "@my/api";

export const Favorites: React.FC = () => {
  const {
    data: favorites,
    isLoading: favoritesLoading,
    refetch,
  } = trpc.favorites.getFavoriteItemsByUser.useQuery();

  const favoritesList = favorites ?? [];

  return (
    <MainLayout>
      <div className="w-full mt-6 max-mobile-640:px-4">
        <h1 className="font-inter font-bold text-4xl text-lume-primary-light max-mobile-640:text-2xl">
          My Favorites
        </h1>
        <div className="mt-4 divider" />

        {!favoritesLoading && favoritesList.length === 0 && (
          <FavoritesPlaceholder />
        )}

        <div className="w-full flex items-center justify-center">
          {favoritesLoading && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 mt-6">
              {[...Array(12)].map((_, idx) => (
                <CardSkeleton key={idx} />
              ))}
            </div>
          )}

          {!favoritesLoading && favoritesList.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 mt-6">
              {favoritesList.map((favorite: MediaItemSnapshot) => {
                const normalizedFavorite = normalizeSnapshot(favorite);

                if (favorite.mediaType === "movie") {
                  return (
                    <MovieCard
                      key={`fav-movie-${favorite.tmdbId}`}
                      movie={normalizedFavorite as TmdbMovie}
                      refetch={() => refetch()}
                    />
                  );
                }
                if (favorite.mediaType === "tv") {
                  return (
                    <TvShowCard
                      key={`fav-tv-${favorite.tmdbId}`}
                      tvShow={normalizedFavorite as TmdbTvShow}
                      refetch={() => refetch()}
                    />
                  );
                }
                return null;
              })}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Favorites;
