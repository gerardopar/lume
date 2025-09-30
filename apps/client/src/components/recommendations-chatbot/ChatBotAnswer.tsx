import React from "react";
import { motion } from "motion/react";

import { type QA } from "./chatbot.helpers";

export const ChatBotAnswer: React.FC<{ qaItem: QA }> = ({ qaItem }) => {
  const answer = Array.isArray(qaItem.answer)
    ? qaItem.answer.join(", ")
    : qaItem.answer;

  if (!answer) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30 }}
      transition={{ duration: 0.3 }}
      className="w-full flex items-center justify-end"
    >
      <p className="text-sm font-poppins bg-lume-green text-white py-2 px-4 rounded-2xl inline text-left rounded-br-none">
        {answer}
      </p>
    </motion.div>
  );
};

export default ChatBotAnswer;
