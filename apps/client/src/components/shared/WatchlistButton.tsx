import React from "react";
import { trpc } from "@utils/trpc";

import XIcon from "@components/svgs/XIcon";
import PlusIcon from "@components/svgs/PlusIcon";
import CardActionItemLoader from "@components/loaders/CardActionItemLoader";

import type { MediaItemSnapshot } from "@my/api";

const WatchlistButton: React.FC<{
  tmdbId: number;
  snapshot: MediaItemSnapshot;
}> = ({ tmdbId, snapshot }) => {
  const utils = trpc.useUtils();
  const { data: isWatchlisted, isLoading: isWatchlistedLoading } =
    trpc.watchlist.checkWatchlistItem.useQuery({ tmdbId });

  const { mutate: toggleWatchlist, isPending: isWatchlistPending } =
    trpc.watchlist.toggleWatchlistItem.useMutation({
      onMutate: async () => {
        // Cancel both queries
        await utils.watchlist.checkWatchlistItem.cancel({ tmdbId });
        await utils.watchlist.getWatchlistItemsByUser.cancel();

        // Get previous states
        const prev = utils.watchlist.checkWatchlistItem.getData({
          tmdbId,
        });
        const prevWatchlistItems =
          utils.watchlist.getWatchlistItemsByUser.getData();

        // Update check query optimistically
        utils.watchlist.checkWatchlistItem.setData(
          { tmdbId: tmdbId },
          { exists: !prev?.exists }
        );

        // Update watchlist optimistically
        utils.watchlist.getWatchlistItemsByUser.setData(
          undefined,
          (old = []) => {
            if (prev?.exists) {
              // removing - filter out the item
              return old.filter((item) => item.tmdbId !== tmdbId);
            } else {
              // adding - add the item
              return [...old, snapshot];
            }
          }
        );

        return { prev, prevWatchlistItems };
      },
      onError: (_err, _vars, ctx) => {
        if (ctx?.prev) {
          utils.watchlist.checkWatchlistItem.setData(
            { tmdbId: tmdbId },
            ctx.prev
          );
        }

        if (ctx?.prevWatchlistItems) {
          utils.watchlist.getWatchlistItemsByUser.setData(
            undefined,
            ctx.prevWatchlistItems
          );
        }
      },
      onSettled: () => {
        utils.watchlist.checkWatchlistItem.invalidate({ tmdbId });
        utils.watchlist.getWatchlistItemsByUser.invalidate();
      },
    });

  let Icon = isWatchlisted?.exists ? XIcon : PlusIcon;
  if (isWatchlistPending) Icon = CardActionItemLoader;

  const handleClick = () => {
    toggleWatchlist({ tmdbId, watchlistItem: snapshot });
  };

  return (
    <button
      onClick={handleClick}
      disabled={isWatchlistPending}
      className={`
        rounded-full flex items-center gap-2 px-4 py-2 
        bg-lume-secondary-dark/60 hover:bg-lume-secondary-dark 
        transition-all duration-300 cursor-pointer max-h-[40px] max-w-[122px]`}
    >
      <Icon
        className={`${
          isWatchlistPending
            ? "loading loading-ring loading-sm mt-1"
            : "w-4 h-4"
        }`}
      />
      Watchlist
    </button>
  );
};

export default WatchlistButton;
