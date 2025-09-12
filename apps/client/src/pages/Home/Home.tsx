import React from "react";

import Hero from "@components/hero/Hero";
import TopBar from "@components/topbar/TopBar";
import MainLayout from "../../layout/MainLayout";
import MovieCardList from "@components/cards/MovieCardList";

import { GenresEnum } from "../../const/genres";

export const Home: React.FC = () => {
  return (
    <MainLayout>
      <TopBar />
      <Hero />
      <MovieCardList title="Popular Movies" genreId={GenresEnum.Animation} />
    </MainLayout>
  );
};

export default Home;
