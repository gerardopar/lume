import React from "react";
import { trpc } from "@utils/trpc";

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
  refetch?: () => void;
}> = ({
  className,
  iconClassName,
  tmdbId,
  snapshot,
  isEnabled = false,
  refetch,
}) => {
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

        const prev = utils.favorites.checkFavoriteItem.getData({
          tmdbId,
        });

        utils.favorites.checkFavoriteItem.setData(
          { tmdbId: tmdbId },
          { exists: !prev?.exists }
        );

        return { prev };
      },
      onError: (_err, _vars, ctx) => {
        if (ctx?.prev) {
          utils.favorites.checkFavoriteItem.setData(
            { tmdbId: tmdbId },
            ctx.prev
          );
        }
      },
      onSuccess: () => {
        refetch?.();
      },
      onSettled: () => {
        utils.favorites.checkFavoriteItem.invalidate({ tmdbId });
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
