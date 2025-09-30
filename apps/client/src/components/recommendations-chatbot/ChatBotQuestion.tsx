import React, { useState } from "react";
import { motion } from "motion/react";

import { GENRES, TV_GENRES } from "../../const/genres";
import { type QA, QAEnum } from "./chatbot.helpers";

export const ChatBotQuestion: React.FC<{
  qaItem: QA;
  index: number;
  setQA: React.Dispatch<React.SetStateAction<QA[]>>;
  setLastAnsweredIndex: React.Dispatch<React.SetStateAction<number | null>>;
}> = ({ qaItem, index, setQA, setLastAnsweredIndex }) => {
  const [genresSelected, setGenresSelected] = useState<string[]>([]);

  const handleAnswer = (
    answer: string | string[],
    index: number,
    type?: QAEnum
  ) => {
    setQA((prevQA) => {
      const newQA = [...prevQA];
      newQA[index].answer = answer;

      if (type === QAEnum.moodFor) {
        const qaGenresIndex = newQA.findIndex(
          (qa) => qa.type === QAEnum.genres
        );
        const genres = answer === "Movie" ? GENRES : TV_GENRES;
        newQA[qaGenresIndex].predefinedAnswers = genres.map((g) => g.name);
      }

      return newQA;
    });

    // ✅ Mark this question as just answered
    setLastAnsweredIndex(index);
  };

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
      {qaItem.predefinedAnswers && (
        <div className="flex flex-wrap gap-1 rounded-2xl mt-2">
          {Array.isArray(qaItem.predefinedAnswers) &&
            qaItem.predefinedAnswers.map((answer) => {
              const active =
                qaItem.answer === answer || genresSelected.includes(answer);
              const disabled =
                !!qaItem.answer &&
                (qaItem.type === QAEnum.moodFor ||
                  (qaItem.type === QAEnum.genres &&
                    !genresSelected.includes(answer)));

              const onClick = () => {
                if (qaItem.type === QAEnum.genres) {
                  setGenresSelected((prev) =>
                    prev.includes(answer)
                      ? prev.filter((g) => g !== answer)
                      : [...prev, answer]
                  );
                  return;
                }
                handleAnswer(answer, index, qaItem.type);
              };

              return (
                <motion.button
                  key={answer}
                  whileTap={{ scale: 0.95 }}
                  disabled={disabled}
                  onClick={onClick}
                  className={`text-sm font-poppins border border-lume-green p-2 px-4 py-1 rounded-full transition-all ${
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
                className="text-sm font-poppins p-2 px-4 py-1 rounded-[10px] bg-gray-500"
              >
                Skip
              </button>
              <button
                onClick={() => handleAnswer(genresSelected, index, qaItem.type)}
                className="text-sm bg-lume-primary-darker font-poppins p-2 px-4 py-1 rounded-[10px]"
              >
                Confirm
              </button>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default ChatBotQuestion;
