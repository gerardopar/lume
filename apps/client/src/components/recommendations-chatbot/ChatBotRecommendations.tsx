import React from "react";
import { trpc } from "@utils/trpc";
import { motion } from "motion/react";
import useEmblaCarousel from "embla-carousel-react";

import WatchlistButton from "@components/shared/WatchlistButton";

import { chatbotStore } from "../../stores/chatbot";

import { buildImageUrl, config } from "../../helpers/tmdb-image.helpers";
import { type QA, QAEnum, qaIndex } from "./chatbot.helpers";
import type { MediaItemSnapshot, TmdbMovie, TmdbTvShow } from "@my/api";

export const ChatBotRecommendations: React.FC<{
  qaItem: QA;
}> = ({ qaItem }) => {
  const qa = chatbotStore.useTracked("qa");
  const setQA = chatbotStore.actions.setQA;

  const clearQA = chatbotStore.actions.clearQA;

  const genresSelected = chatbotStore.useTracked("genresSelected");

  const {
    mutateAsync: reRollRecommendations,
    isPending: reRollRecommendationsPending,
  } = trpc.ai.reRollRecommendations.useMutation();

  const [emblaRef, _emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
  });

  const handleReRollRecommendations = () => {
    reRollRecommendations(
      {
        type: qa[qaIndex.moodFor].answer === "movies" ? "movies" : "tv",
        genres: genresSelected,
        vibe: qa[qaIndex.moodDescription].answer!,
        previousTitles:
          qa[qaIndex.recommendations].predefinedAnswers?.map?.(
            (item: Partial<TmdbMovie> | Partial<TmdbTvShow>) =>
              item?.original_title || item?.original_name
          ) ?? [],
      },
      {
        onSuccess: (data) => {
          const existingRecommendations =
            qa[qaIndex.recommendations].predefinedAnswers;
          const newRecommendations = data?.results;
          const updatedRecommendations = [
            ...newRecommendations,
            ...existingRecommendations,
          ];
          setQA(
            updatedRecommendations,
            qaIndex.recommendations,
            QAEnum.recommendations
          );
        },
      }
    );
  };

  return (
    <div className="w-full mt-4">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {Array.isArray(qaItem.predefinedAnswers) &&
            qaItem.predefinedAnswers.map(
              (
                answer: Partial<TmdbMovie> | Partial<TmdbTvShow>,
                idx: number
              ) => {
                const recommendationsLength =
                  qaItem.predefinedAnswers.length ?? 0;
                const currentRecommendationIndex = idx + 1;

                const title =
                  answer?.original_title || answer?.original_name || "";

                const poster =
                  answer?.poster_path || answer?.backdrop_path || "";

                const posterUrl = buildImageUrl(
                  config,
                  "poster",
                  poster,
                  "original"
                );

                const mediaType =
                  qa[qaIndex.moodFor].answer === "movies" ? "movie" : "tv";

                const snapShot: MediaItemSnapshot =
                  mediaType === "movie"
                    ? {
                        tmdbId: answer?.id,
                        mediaType: "movie",
                        title,
                        posterPath: answer?.poster_path || "",
                        releaseDate: answer?.release_date,
                        overview: answer?.overview,
                        voteAverage: answer?.vote_average,
                        genreIds: answer?.genre_ids,
                      }
                    : {
                        tmdbId: answer?.id,
                        mediaType: "tv",
                        title,
                        posterPath: answer?.poster_path || "",
                        releaseDate: answer?.first_air_date,
                        overview: answer?.overview,
                        voteAverage: answer?.vote_average,
                        genreIds: answer?.genre_ids,
                      };

                return (
                  <motion.div
                    key={idx}
                    className="min-w-full w-full max-w-[400px] max-mobile-768:max-w-[400px] max-mobile-425:max-w-[90%] max-mobile-375:max-w-[90%] shrink-0 px-2"
                  >
                    <div
                      className={`
                        h-[240px] bg-cover bg-top relative
                        flex flex-col items-start justify-end p-4 rounded-2xl group gap-2
                      `}
                      style={{ backgroundImage: `url(${posterUrl})` }}
                    >
                      <div className="rounded-2xl absolute inset-0 bg-gradient-to-b from-black/5 to-black/100" />
                      <div className="absolute top-2 right-4 shadow-lg text-xs inline px-4 py-2 rounded-full backdrop-blur-sm bg-white/10">
                        {currentRecommendationIndex}/{recommendationsLength}
                      </div>
                      <h1 className="w-full text-xl font-bold font-inter text-white z-10">
                        {title}
                      </h1>
                      <p className="w-full text-sm font-poppins text-white font-[200] line-clamp-3 z-10">
                        {answer?.overview}
                      </p>
                      <WatchlistButton
                        tmdbId={answer.id!}
                        snapshot={snapShot}
                      />
                    </div>
                  </motion.div>
                );
              }
            )}
        </div>
      </div>

      <div className="flex items-center justify-center w-full mt-2 gap-2">
        <button
          onClick={() => clearQA()}
          className="cursor-pointer text-sm font-poppins p-2 px-6 py-2 rounded-full bg-gray-500 rounded-bl-none"
        >
          Start Over
        </button>
        <button
          onClick={() => handleReRollRecommendations()}
          disabled={reRollRecommendationsPending}
          className="cursor-pointer text-sm bg-lume-primary-darker font-poppins p-2 px-6 py-2 rounded-full rounded-br-none"
        >
          {reRollRecommendationsPending ? "Re-rolling..." : "Re-roll"}
        </button>
      </div>
    </div>
  );
};

export default ChatBotRecommendations;
