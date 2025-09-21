import React from "react";
import { trpc } from "@utils/trpc";
import { useQueryClient } from "@tanstack/react-query";

import XIcon from "@components/svgs/XIcon";
import PlusIcon from "@components/svgs/PlusIcon";

import type { MediaItemSnapshot } from "@my/api";

const WatchlistButton: React.FC<{
  tmdbId: number;
  snapshot: MediaItemSnapshot;
}> = ({ tmdbId, snapshot }) => {
  const queryClient = useQueryClient();
  const { data: isWatchlisted, isLoading: isWatchlistedLoading } =
    trpc.watchlist.checkWatchlistItem.useQuery({ tmdbId });

  const { mutate: toggleWatchlist, isPending: isWatchlistPending } =
    trpc.watchlist.toggleWatchlistItem.useMutation({
      onMutate: async () => {
        await queryClient.cancelQueries([
          ["watchlist.checkWatchlistItem", { tmdbId }],
        ]);
        const prev = queryClient.getQueryData<{ exists: boolean }>([
          ["watchlist.checkWatchlistItem", { tmdbId }],
        ]);
        queryClient.setQueryData(
          [["watchlist.checkWatchlistItem", { tmdbId }]],
          { exists: !prev?.exists }
        );
        return { prev };
      },
      onError: (_err, _vars, ctx) => {
        if (ctx?.prev) {
          queryClient.setQueryData(
            [["watchlist.checkWatchlistItem", { tmdbId }]],
            ctx.prev
          );
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries([
          ["watchlist.checkWatchlistItem", { tmdbId }],
        ]);
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
