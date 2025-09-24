import React from "react";

import { WatchlistTabEnum } from "./watchlist.helpers";

export const WatchListTabs: React.FC<{
  activeTab: WatchlistTabEnum;
  setActiveTab: (tab: WatchlistTabEnum) => void;
}> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="w-full flex items-center justify-start">
      <button
        onClick={() => setActiveTab(WatchlistTabEnum.Watched)}
        className={`cursor-pointer px-2 pb-1 font-[200] ${
          activeTab === WatchlistTabEnum.Watched
            ? "font-semibold text-lume-green border-lume-green border-b-[1px]"
            : "font-[200] text-white"
        }`}
      >
        Watched
      </button>
      <button
        onClick={() => setActiveTab(WatchlistTabEnum.NotWatched)}
        className={`cursor-pointer px-2 pb-1 font-[200] ${
          activeTab === WatchlistTabEnum.NotWatched
            ? "font-semibold text-lume-green border-lume-green border-b-[1px]"
            : "font-[200] text-white"
        }`}
      >
        Not Yet
      </button>
    </div>
  );
};

export default WatchListTabs;
