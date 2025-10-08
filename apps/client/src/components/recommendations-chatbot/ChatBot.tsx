import React from "react";
import { trpc } from "@utils/trpc";

import ChatBotHeader from "./ChatBotHeader";
import ChatBotInput from "./ChatBotInput";
import ChatBotQA from "./ChatBotQA";

import { chatbotStore } from "../../stores/chatbot";

const RecommendationsChatBot: React.FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const qa = chatbotStore.useTracked("qa");

  const { mutateAsync: getAiRecommendations, isPending } =
    trpc.ai.getAiRecommendations.useMutation();

  return (
    <div className="flex flex-col h-full w-full">
      <ChatBotHeader onClose={onClose} />

      <ChatBotQA qa={qa} isPending={isPending} />

      <ChatBotInput qa={qa} getAiRecommendations={getAiRecommendations} />
    </div>
  );
};

export default RecommendationsChatBot;
