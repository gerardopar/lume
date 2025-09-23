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
      <Hero mediaType="movie" />
      <div className="w-full max-mobile-640:px-2">
        <MoviePopularCardList className="mt-4" />
        <MovieCategoryCardList title="Action" genreId={GenresEnum.Action} />
        <MovieCategoryCardList
          title="Adventure"
          genreId={GenresEnum.Adventure}
        />
        <MovieCategoryCardList title="Comedy" genreId={GenresEnum.Comedy} />
        <MovieCategoryCardList title="Drama" genreId={GenresEnum.Drama} />
        <MovieCategoryCardList
          title="Sci-Fi"
          genreId={GenresEnum.ScienceFiction}
        />
        <MovieCategoryCardList title="Thriller" genreId={GenresEnum.Thriller} />
        <MovieCategoryCardList title="Horror" genreId={GenresEnum.Horror} />
        <MovieCategoryCardList title="Fantasy" genreId={GenresEnum.Fantasy} />
        <MovieCategoryCardList title="Crime" genreId={GenresEnum.Crime} />
        <MovieCategoryCardList title="Romance" genreId={GenresEnum.Romance} />
      </div>
    </MainLayout>
  );
};

export default Home;
