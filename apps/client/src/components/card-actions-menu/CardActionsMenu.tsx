import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import { trpc } from "@utils/trpc";

import { AnimatePresence, motion } from "motion/react";

import XIcon from "@components/svgs/XIcon";
import CloseButton from "@components/shared/CloseButton";
import CardActionItemLoader from "@components/loaders/CardActionItemLoader";
import CardActionsMenuSkeleton from "@components/skeleton/CardActionsMenuSkeleton";

import {
  CardActionMenuEnum,
  cardActionsMenu,
} from "./card-actions-menu.helpers";
import type { MediaItemSnapshot } from "@my/api";

export const CardActionsMenu: React.FC<{
  isInline?: boolean;
  handleCloseInline?: () => void;
  cardItemId: number;
  snapshot: MediaItemSnapshot;
}> = ({ isInline, handleCloseInline, cardItemId, snapshot }) => {
  const queryClient = useQueryClient();

  const { data: isFavorited, isLoading: isFavoritedLoading } =
    trpc.favorites.checkFavoriteItem.useQuery({ tmdbId: cardItemId });

  const { data: isWatchlisted, isLoading: isWatchlistedLoading } =
    trpc.watchlist.checkWatchlistItem.useQuery({ tmdbId: cardItemId });

  const { mutate: toggleFavorite, isPending: isFavoritePending } =
    trpc.favorites.toggleFavoriteItem.useMutation({
      onMutate: async () => {
        await queryClient.cancelQueries([
          "favorites.checkFavoriteItem",
          { tmdbId: cardItemId },
        ]);
        const prev = queryClient.getQueryData<{ exists: boolean }>([
          "favorites.checkFavoriteItem",
          { tmdbId: cardItemId },
        ]);
        queryClient.setQueryData(
          ["favorites.checkFavoriteItem", { tmdbId: cardItemId }],
          { exists: !prev?.exists }
        );

        return { prev };
      },
      onError: (_err, _vars, ctx) => {
        if (ctx?.prev) {
          queryClient.setQueryData(
            ["favorites.checkFavoriteItem", { tmdbId: cardItemId }],
            ctx.prev
          );
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries([
          "favorites.checkFavoriteItem",
          { tmdbId: cardItemId },
        ]);
      },
    });

  const { mutate: toggleWatchlist, isPending: isWatchlistPending } =
    trpc.watchlist.toggleWatchlistItem.useMutation({
      onMutate: async () => {
        await queryClient.cancelQueries([
          "watchlist.checkWatchlistItem",
          { tmdbId: cardItemId },
        ]);
        const prev = queryClient.getQueryData<{ exists: boolean }>([
          "watchlist.checkWatchlistItem",
          { tmdbId: cardItemId },
        ]);
        queryClient.setQueryData(
          ["watchlist.checkWatchlistItem", { tmdbId: cardItemId }],
          { exists: !prev?.exists }
        );

        await queryClient.cancelQueries(["watchlist.getWatchlistItemsByUser"]);

        const prevWatchlistItems = queryClient.getQueryData<
          MediaItemSnapshot[]
        >(["watchlist.getWatchlistItemsByUser"]);

        // Update the watchlist optimistically
        queryClient.setQueryData(
          ["watchlist.getWatchlistItemsByUser"],
          (old: MediaItemSnapshot[] = []) => {
            if (prev?.exists) {
              // removing
              return old.filter((item) => item.tmdbId !== cardItemId);
            } else {
              // adding
              return [...old, snapshot];
            }
          }
        );

        return { prev, prevWatchlistItems };
      },
      onError: (_err, _vars, ctx) => {
        if (ctx?.prev) {
          queryClient.setQueryData(
            ["watchlist.checkWatchlistItem", { tmdbId: cardItemId }],
            ctx.prev
          );
        }

        if (ctx?.prevWatchlistItems) {
          queryClient.setQueryData(
            ["watchlist.getWatchlistItemsByUser"],
            ctx.prevWatchlistItems
          );
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries([
          "watchlist.checkWatchlistItem",
          { tmdbId: cardItemId },
        ]);

        queryClient.invalidateQueries(["watchlist.getWatchlistItemsByUser"]);
      },
    });

  const isLoading = isFavoritedLoading || isWatchlistedLoading;

  if (isInline) {
    return (
      <AnimatePresence>
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/60 rounded-xl"
          onClick={(e) => {
            e.stopPropagation();
            handleCloseInline?.();
          }}
        >
          <CloseButton
            onClick={() => handleCloseInline?.()}
            className="absolute top-[10px] right-[10px]"
          />

          <motion.div
            key="actions"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex flex-col gap-4 relative w-full px-4"
          >
            {isLoading && <CardActionsMenuSkeleton />}

            {!isLoading &&
              cardActionsMenu.map((item) => {
                const _isFavorited =
                  item.type === CardActionMenuEnum.Favorites &&
                  isFavorited?.exists;
                const _isWatchlisted =
                  item.type === CardActionMenuEnum.Watchlist &&
                  isWatchlisted?.exists;

                const iconColor =
                  item.type === CardActionMenuEnum.Favorites
                    ? `text-red-500 ${_isFavorited ? "fill-red-500" : ""}`
                    : "text-white";

                let iconClassName = "w-4 h-4";

                let Icon: React.FC<{ className?: string }> | React.ReactNode =
                  item.Icon;
                if (_isWatchlisted) Icon = XIcon;
                if (
                  (item.type === CardActionMenuEnum.Favorites &&
                    isFavoritePending) ||
                  (item.type === CardActionMenuEnum.Watchlist &&
                    isWatchlistPending)
                ) {
                  Icon = CardActionItemLoader;
                  iconClassName = "";
                }

                const handleClick = (e: React.MouseEvent) => {
                  e.stopPropagation();
                  if (item.type === CardActionMenuEnum.Favorites) {
                    toggleFavorite({
                      tmdbId: cardItemId,
                      favoriteItem: snapshot,
                    });
                  }
                  if (item.type === CardActionMenuEnum.Watchlist) {
                    toggleWatchlist({
                      tmdbId: cardItemId,
                      watchlistItem: snapshot,
                    });
                  } else if (item.type === CardActionMenuEnum.Share) {
                    // TODO: share
                    // generates a link to the app with the media ID
                    // opens a share sheet
                  }
                };

                return (
                  <button
                    key={item.id}
                    onClick={handleClick}
                    disabled={isFavoritePending || isWatchlistPending}
                    className="flex items-center max-h-[36px] gap-2 px-4 py-2 bg-lume-secondary-dark/60 rounded-lg hover:bg-lume-secondary-dark transition-all duration-300 cursor-pointer"
                  >
                    <Icon className={`${iconColor} ${iconClassName}`} />
                    <span className="text-white font-poppins font-[200] text-sm text-center">
                      {item.label}
                    </span>
                  </button>
                );
              })}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  // fallback modal version
  return (
    <div className="p-4">
      <h2 className="text-lg font-bold font-inter mb-2">Options</h2>
    </div>
  );
};

export default CardActionsMenu;
