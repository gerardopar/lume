import React, { useState } from "react";

import ChatBotHeader from "./ChatBotHeader";
import ChatBotInput from "./ChatBotInput";
import ChatBotQA from "./ChatBotQA";

import { type QA, qaState } from "./chatbot.helpers";

const RecommendationsChatBot: React.FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [qa, setQA] = useState<QA[]>(qaState);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted");
  };

  return (
    <div className="flex flex-col h-full w-full">
      <ChatBotHeader onClose={onClose} />

      <ChatBotQA qa={qa} setQA={setQA} />

      <ChatBotInput onSubmit={onSubmit} />
    </div>
  );
};

export default RecommendationsChatBot;
