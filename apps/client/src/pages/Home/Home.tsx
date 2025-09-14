import React from "react";

import Hero from "@components/hero/Hero";
import TopBar from "@components/topbar/TopBar";
import MainLayout from "../../layout/MainLayout";
import MoviePopularCardList from "@components/cards/MoviePopularCardList";
import MovieCategoryCardList from "@components/cards/MovieCategoryCardList";

import { GenresEnum } from "../../const/genres";

export const Home: React.FC = () => {
  return (
    <MainLayout>
      <TopBar />
      <Hero />
      <MoviePopularCardList className="mt-4" />
      <MovieCategoryCardList title="Animation" genreId={GenresEnum.Animation} />
      <MovieCategoryCardList title="Comedy" genreId={GenresEnum.Comedy} />
    </MainLayout>
  );
};

export default Home;
