import React from "react";
import { trpc } from "@utils/trpc";

import MainLayout from "../../layout/MainLayout";
import FavoritesPlaceholder from "../../components/empty-states/FavoritesPlaceholder";

export const Favorites: React.FC = () => {
  const { data: favorites, isLoading: favoritesLoading } =
    trpc.favorites.getFavoriteItemsByUser.useQuery();

  return (
    <MainLayout>
      <div className="w-full mt-6">
        <h1 className="font-inter font-bold text-4xl text-lume-primary-light">
          My Favorites
        </h1>
        <div className="mt-4 divider" />

        {!favoritesLoading && favorites?.length === 0 && (
          <FavoritesPlaceholder />
        )}
      </div>
    </MainLayout>
  );
};

export default Favorites;
