import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Hero from "@components/hero/Hero";
import TopBar from "@components/topbar/TopBar";
import MainLayout from "../../layout/MainLayout";
import MediaWrapper from "@components/media/MediaWrapper";
import MoviePopularCardList from "@components/cards/MoviePopularCardList";
import MovieCategoryCardList from "@components/cards/MovieCategoryCardList";

import { GenresEnum } from "../../const/genres";

import { ModalTypesEnum } from "../../stores/modals";
import { useModal } from "../../stores/modals";

export const Home: React.FC = () => {
  const { open } = useModal();

  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    const tmdbId = searchParams.get("tmdbId");
    const mediaType = searchParams.get("media");

    if (tmdbId && mediaType) {
      open(
        <MediaWrapper
          tmdbId={Number(tmdbId)}
          mediaType={mediaType as "movie" | "tv"}
        />,
        {
          type: ModalTypesEnum.Bottom,
          modalBoxClassName: "p-0",
        }
      );
    }
  }, [location]);

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
