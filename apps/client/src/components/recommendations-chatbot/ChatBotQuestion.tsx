import React from "react";
import { motion } from "motion/react";

import { chatbotStore } from "../../stores/chatbot";

import { type QA, QAEnum, qaIndex } from "./chatbot.helpers";

export const ChatBotQuestion: React.FC<{
  qaItem: QA;
  index: number;
  isPending: boolean;
}> = ({ qaItem, index, isPending }) => {
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
        <div>
          <p>Recommendations</p>
        </div>
      )}
    </motion.div>
  );
};

export default ChatBotQuestion;
