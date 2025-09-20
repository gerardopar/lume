import React from "react";
import { trpc } from "@utils/trpc";
import { useQueryClient } from "@tanstack/react-query";

import HeartIcon from "@components/svgs/HeartIcon";
import CardActionItemLoader from "@components/loaders/CardActionItemLoader";

import type { MediaItemSnapshot } from "@my/api";

export const FavoritesButton: React.FC<{
  className?: string;
  iconClassName?: string;
  tmdbId: number;
  snapshot: MediaItemSnapshot;
  isEnabled?: boolean;
}> = ({ className, iconClassName, tmdbId, snapshot, isEnabled = false }) => {
  const queryClient = useQueryClient();

  const { data: isFavorited, isLoading: isFavoritedLoading } =
    trpc.favorites.checkFavoriteItem.useQuery(
      { tmdbId },
      { enabled: isEnabled }
    );

  const { mutate: toggleFavorite, isPending: isFavoritePending } =
    trpc.favorites.toggleFavoriteItem.useMutation({
      onMutate: async () => {
        await queryClient.cancelQueries([
          ["favorites.checkFavoriteItem", { tmdbId }],
        ]);
        const prev = queryClient.getQueryData<{ exists: boolean }>([
          ["favorites.checkFavoriteItem", { tmdbId }],
        ]);
        queryClient.setQueryData(
          [["favorites.checkFavoriteItem", { tmdbId }]],
          { exists: !prev?.exists }
        );
        return { prev };
      },
      onError: (_err, _vars, ctx) => {
        if (ctx?.prev) {
          queryClient.setQueryData(
            [["favorites.checkFavoriteItem", { tmdbId }]],
            ctx.prev
          );
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries([
          ["favorites.checkFavoriteItem", { tmdbId }],
        ]);
      },
    });

  const iconColor = isFavorited?.exists
    ? "text-red-500 fill-red-500"
    : "text-white fill-white";

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
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
