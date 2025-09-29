import React from "react";

import ChatBotHeader from "./ChatBotHeader";
import ChatBotInput from "./ChatBotInput";
import ChatBotQA from "./ChatBotQA";

const RecommendationsChatBot: React.FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted");
  };

  return (
    <div className="flex flex-col h-full w-full">
      <ChatBotHeader onClose={onClose} />

      <ChatBotQA />

      <ChatBotInput onSubmit={onSubmit} />
    </div>
  );
};

export default RecommendationsChatBot;
