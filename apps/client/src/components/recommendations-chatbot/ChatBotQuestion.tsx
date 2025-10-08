import React from "react";
import { motion } from "motion/react";

import WatchlistButton from "@components/shared/WatchlistButton";

import { chatbotStore } from "../../stores/chatbot";

import { buildImageUrl, config } from "../../helpers/tmdb-image.helpers";
import { type QA, QAEnum, qaIndex } from "./chatbot.helpers";
import type { MediaItemSnapshot, TmdbMovie, TmdbTvShow } from "@my/api";

export const ChatBotQuestion: React.FC<{
  qaItem: QA;
  index: number;
  isPending: boolean;
}> = ({ qaItem, index, isPending }) => {
  const qa = chatbotStore.useTracked("qa");
  const setQA = chatbotStore.actions.setQA;
  const setLastAnsweredIndex = chatbotStore.actions.setLastAnsweredIndex;

  const genresSelected = chatbotStore.useTracked("genresSelected");
  const setGenresSelected = chatbotStore.actions.setGenresSelected;

  const handleAnswer = (
    answer: string | string[],
    index: number,
    type?: QAEnum
  ) => {
    setQA(answer, index, type);

    // ✅ Mark this question as just answered
    setLastAnsweredIndex(index);
  };

  if (index === qaIndex.recommendations && isPending) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="w-full flex items-start justify-center flex-col"
    >
      <p className="text-sm font-poppins font-[200] bg-lume-primary-darker py-2 px-4 rounded-2xl inline text-left rounded-bl-none">
        {qaItem.question}
      </p>

      {/* Predefined chips */}
      {qaItem.predefinedAnswers && qaItem.type !== QAEnum.recommendations && (
        <div className="flex flex-wrap gap-1 rounded-2xl mt-2">
          {Array.isArray(qaItem.predefinedAnswers) &&
            qaItem.predefinedAnswers.map((answer, idx) => {
              const active =
                qaItem.answer === answer || genresSelected.includes(answer);
              const disabled =
                !!qaItem.answer &&
                (qaItem.type === QAEnum.moodFor ||
                  (qaItem.type === QAEnum.genres &&
                    !genresSelected.includes(answer)));

              const onClick = () => {
                if (qaItem.type === QAEnum.genres) {
                  setGenresSelected(answer);
                  return;
                }
                handleAnswer(answer, index, qaItem.type);
              };

              return (
                <motion.button
                  key={idx}
                  whileTap={{ scale: 0.95 }}
                  disabled={disabled}
                  onClick={onClick}
                  className={`text-sm font-poppins border border-lume-green p-2 px-4 py-1 rounded-full transition-all capitalize ${
                    active ? "bg-lume-green text-white" : ""
                  } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {answer}
                </motion.button>
              );
            })}

          {qaItem.type === QAEnum.genres && !qaItem.answer && (
            <div className="flex items-center justify-center w-full mt-2 gap-2">
              <button
                onClick={() => handleAnswer([], index, qaItem.type)}
                className="cursor-pointer text-sm font-poppins p-2 px-6 py-2 rounded-full bg-gray-500 rounded-bl-none"
              >
                Skip
              </button>
              <button
                disabled={!genresSelected.length}
                onClick={() => handleAnswer(genresSelected, index, qaItem.type)}
                className="cursor-pointer text-sm bg-lume-primary-darker font-poppins p-2 px-6 py-2 rounded-full rounded-br-none"
              >
                Confirm
              </button>
            </div>
          )}
        </div>
      )}

      {qaItem.type === QAEnum.recommendations && qaItem.predefinedAnswers && (
        <div className="w-full flex flex-nowrap overflow-x-scroll mt-4 rounded-2xl">
          {Array.isArray(qaItem.predefinedAnswers) &&
            qaItem.predefinedAnswers.map(
              (
                answer: Partial<TmdbMovie> | Partial<TmdbTvShow>,
                idx: number
              ) => {
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
                  qa[qaIndex.moodFor].answer === "movie" ? "movie" : "tv";

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
                    className={`min-w-full h-[240px] snap-center bg-cover bg-top relative flex flex-col items-start justify-end p-4 rounded-2xl group gap-2 mr-2`}
                    style={{ backgroundImage: `url(${posterUrl})` }}
                  >
                    <div
                      className="
                      rounded-2xl
                          absolute inset-0 bg-gradient-to-b from-black/25 to-black/75
                        "
                    />
                    <h1 className="w-full text-xl font-bold font-inter text-white z-10">
                      {title}
                    </h1>
                    <p className="w-full text-sm font-poppins text-white font-[200] line-clamp-3 z-10">
                      {answer?.overview}
                    </p>
                    <WatchlistButton tmdbId={answer.id!} snapshot={snapShot} />
                  </motion.div>
                );
              }
            )}
        </div>
      )}
    </motion.div>
  );
};

export default ChatBotQuestion;
