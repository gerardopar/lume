import React from "react";

import Hero from "@components/hero/Hero";
import TopBar from "@components/topbar/TopBar";
import MainLayout from "../../layout/MainLayout";
import TvShowPopularCardList from "@components/cards/tv/TvShowPopularCardList";
import TvShowCategoryCardList from "@components/cards/tv/TvShowCategoryCardList";

import { TVGenresEnum } from "../../const/genres";

export const TVShows: React.FC = () => {
  return (
    <MainLayout>
      <TopBar />
      <Hero mediaType="tv" />
      <TvShowPopularCardList className="mt-4" />
      <TvShowCategoryCardList
        title="Action"
        genreId={TVGenresEnum.ActionAdventure}
      />
      <TvShowCategoryCardList title="Comedy" genreId={TVGenresEnum.Comedy} />
      <TvShowCategoryCardList title="Drama" genreId={TVGenresEnum.Drama} />
      <TvShowCategoryCardList
        title="Sci-Fi"
        genreId={TVGenresEnum.SciFiFantasy}
      />
      <TvShowCategoryCardList title="Mystery" genreId={TVGenresEnum.Mystery} />
      <TvShowCategoryCardList title="Crime" genreId={TVGenresEnum.Crime} />
      <TvShowCategoryCardList
        title="Animation"
        genreId={TVGenresEnum.Animation}
      />
    </MainLayout>
  );
};

export default TVShows;
