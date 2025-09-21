import React from "react";
import { trpc } from "@utils/trpc";
import { useQueryClient } from "@tanstack/react-query";

import HeartIcon from "@components/svgs/HeartIcon";
import CardActionItemLoader from "@components/loaders/CardActionItemLoader";

import { useAuth } from "../../hooks/useAuth";
import { useCurrentUser } from "../../stores/user";

import type { MediaItemSnapshot } from "@my/api";

export const FavoritesButton: React.FC<{
  className?: string;
  iconClassName?: string;
  tmdbId: number;
  snapshot: MediaItemSnapshot;
  isEnabled?: boolean;
}> = ({ className, iconClassName, tmdbId, snapshot, isEnabled = false }) => {
  const utils = trpc.useUtils();
  const { isLoggedIn } = useCurrentUser();
  const { showAuth } = useAuth();

  const { data: isFavorited, isLoading: isFavoritedLoading } =
    trpc.favorites.checkFavoriteItem.useQuery(
      { tmdbId },
      { enabled: isEnabled && isLoggedIn }
    );

  const { mutate: toggleFavorite, isPending: isFavoritePending } =
    trpc.favorites.toggleFavoriteItem.useMutation({
      onMutate: async () => {
        await utils.favorites.checkFavoriteItem.cancel({ tmdbId });
        await utils.favorites.getFavoriteItemsByUser.cancel();

        const prev = utils.favorites.checkFavoriteItem.getData({
          tmdbId,
        });
        const prevFavoriteItems =
          utils.favorites.getFavoriteItemsByUser.getData();

        utils.favorites.checkFavoriteItem.setData(
          { tmdbId: tmdbId },
          { exists: !prev?.exists }
        );

        utils.favorites.getFavoriteItemsByUser.setData(
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

        return { prev, prevFavoriteItems };
      },
      onError: (_err, _vars, ctx) => {
        if (ctx?.prev) {
          utils.favorites.checkFavoriteItem.setData(
            { tmdbId: tmdbId },
            ctx.prev
          );
        }

        if (ctx?.prevFavoriteItems) {
          utils.favorites.getFavoriteItemsByUser.setData(
            undefined,
            ctx.prevFavoriteItems
          );
        }
      },
      onSettled: () => {
        utils.favorites.checkFavoriteItem.invalidate({ tmdbId });
        utils.favorites.getFavoriteItemsByUser.invalidate();
      },
    });

  const iconColor = isFavorited?.exists
    ? "text-red-500 fill-red-500"
    : "text-white fill-white";

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        if (!isLoggedIn) {
          showAuth();
          return;
        }
        toggleFavorite({ tmdbId, favoriteItem: snapshot });
      }}
      disabled={isFavoritePending}
      className={className}
    >
      {isFavoritePending || isFavoritedLoading ? (
        <CardActionItemLoader />
      ) : (
        <HeartIcon className={`${iconColor} ${iconClassName} w-4 h-4`} />
      )}
    </button>
  );
};

export default FavoritesButton;
