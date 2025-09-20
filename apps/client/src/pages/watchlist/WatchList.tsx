import React from "react";
import { trpc } from "@utils/trpc";

import MainLayout from "../../layout/MainLayout";
import MovieCard from "@components/cards/MovieCard";
import TvShowCard from "@components/cards/tv/TvShowCard";
import WatchListPlaceholder from "../../components/empty-states/WatchListPlaceholder";

import { normalizeSnapshot } from "../../helpers/snapshot.helpers";

import type { TmdbMovie, TmdbTvShow, MediaItemSnapshot } from "@my/api";
import CardSkeleton from "@components/skeleton/CardSkeleton";

export const WatchList: React.FC = () => {
  const { data, isLoading: watchlistLoading } =
    trpc.watchlist.getWatchlistItemsByUser.useQuery();

  const watchlist = data ?? [];

  return (
    <MainLayout>
      <div className="w-full mt-6">
        <h1 className="font-inter font-bold text-4xl text-lume-primary-light">
          My Watchlist
        </h1>
        <div className="mt-4 divider" />

        {!watchlistLoading && watchlist?.length === 0 && (
          <WatchListPlaceholder />
        )}

        <div className="w-full flex items-center justify-center">
          {watchlistLoading && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 mt-6">
              {[...Array(12)].map((_, idx) => (
                <CardSkeleton key={idx} />
              ))}
            </div>
          )}

          {!watchlistLoading && watchlist.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 mt-6">
              {watchlist.map((favorite: MediaItemSnapshot) => {
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
      </div>
    </MainLayout>
  );
};

export default WatchList;
