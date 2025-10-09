import React, { useState } from "react";
import { trpc } from "@utils/trpc";

import MainLayout from "../../layout/MainLayout";
import MovieCard from "@components/cards/MovieCard";
import TvShowCard from "@components/cards/tv/TvShowCard";
import CardSkeleton from "@components/skeleton/CardSkeleton";
import WatchListTabs from "@components/watchlist-tabs/WatchListTabs";
import WatchListPlaceholder from "../../components/empty-states/WatchListPlaceholder";

import { normalizeSnapshot } from "../../helpers/snapshot.helpers";

import { WatchlistTabEnum } from "../../components/watchlist-tabs/watchlist.helpers";
import type { TmdbMovie, TmdbTvShow, MediaItemSnapshot } from "@my/api";

export const WatchList: React.FC = () => {
  const [activeTab, setActiveTab] = useState(WatchlistTabEnum.NotWatched);

  const {
    data,
    isLoading: watchlistLoading,
    refetch,
  } = trpc.watchlist.getWatchlistItemsByUser.useQuery();

  const watchlist = data ?? [];

  // TODO: move this logic to the server
  // ... to support larger lists + pagination
  const watchedList = watchlist.filter((item) => item.watchedAt);
  const unwatchedList = watchlist.filter((item) => !item.watchedAt);

  const list =
    activeTab === WatchlistTabEnum.Watched ? watchedList : unwatchedList;

  return (
    <MainLayout>
      <div className="w-full mt-6 max-mobile-640:px-4 pb-8">
        <h1 className="font-inter font-bold text-4xl text-lume-primary-light max-mobile-640:text-2xl">
          My Watchlist
        </h1>
        <div className="mt-4 divider" />

        <WatchListTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {!watchlistLoading && list?.length === 0 && (
          <WatchListPlaceholder activeTab={activeTab} />
        )}

        <div className="w-full flex items-center justify-center">
          {watchlistLoading && (
            <div className="w-full grid gap-6 mt-6 grid-cols-auto-fill max-mobile-768:gap-1">
              {[...Array(12)].map((_, idx) => (
                <CardSkeleton key={idx} />
              ))}
            </div>
          )}

          {!watchlistLoading && list.length > 0 && (
            <div className="w-full grid gap-6 mt-6 grid-cols-auto-fill max-mobile-768:gap-1">
              {list.map((favorite: MediaItemSnapshot) => {
                const normalizedFavorite = normalizeSnapshot(favorite);

                if (favorite.mediaType === "movie") {
                  return (
                    <MovieCard
                      key={`watchlist-movie-${favorite.tmdbId}`}
                      movie={normalizedFavorite as TmdbMovie}
                      refetch={() => refetch()}
                      showWatchedOption
                      className="responsive-card"
                    />
                  );
                }
                if (favorite.mediaType === "tv") {
                  return (
                    <TvShowCard
                      key={`watchlist-tv-${favorite.tmdbId}`}
                      tvShow={normalizedFavorite as TmdbTvShow}
                      refetch={() => refetch()}
                      showWatchedOption
                      className="responsive-card"
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
