import React from "react";
import { trpc } from "@utils/trpc";

import MainLayout from "../../layout/MainLayout";
import WatchListPlaceholder from "../../components/empty-states/WatchListPlaceholder";

export const WatchList: React.FC = () => {
  const { data: watchlist, isLoading: watchlistLoading } =
    trpc.watchlist.getWatchlistItemsByUser.useQuery();

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
      </div>
    </MainLayout>
  );
};

export default WatchList;
