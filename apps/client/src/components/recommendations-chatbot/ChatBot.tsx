import React, { useState } from "react";
import { trpc } from "@utils/trpc";

import ChatBotHeader from "./ChatBotHeader";
import ChatBotInput from "./ChatBotInput";
import ChatBotQA from "./ChatBotQA";

import { type QA, qaState } from "./chatbot.helpers";

// TODOS:
// 1. move chatbot state into zustand
// 2. add details recommendations view

const RecommendationsChatBot: React.FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [qa, setQA] = useState<QA[]>(qaState);

  const { mutateAsync: getAiRecommendations, isPending } =
    trpc.ai.getAiRecommendations.useMutation();

  return (
    <div className="flex flex-col h-full w-full">
      <ChatBotHeader onClose={onClose} />

      <ChatBotQA qa={qa} setQA={setQA} isPending={isPending} />

      <ChatBotInput
        qa={qa}
        setQA={setQA}
        getAiRecommendations={getAiRecommendations}
      />
    </div>
  );
};

export default RecommendationsChatBot;
