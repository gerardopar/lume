import React, { useState } from "react";
import { z } from "zod";

import SendIcon from "../svgs/SendIcon";

import { type QA, qaIndex, QAEnum } from "./chatbot.helpers";
import type { FilterOptionEnum } from "@components/SuggestionsInput/suggestions-input.helpers";

import { chatbotStore } from "../../stores/chatbot";

const ChatBotInput: React.FC<{
  qa: QA[];
  getAiRecommendations: (params: {
    type: FilterOptionEnum;
    genres: string[];
    vibe: string;
  }) => Promise<{ titles: string[]; results: any[] }>;
}> = ({ qa, getAiRecommendations }) => {
  const setQA = chatbotStore.actions.setQA;
  const [message, setMessage] = useState<string>("");

  const validate = () => {
    const result = z.string().min(1).safeParse(message);

    if (!result.success) {
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setQA(message, qaIndex.moodDescription);
    setMessage("");

    const recommendations = await getAiRecommendations({
      type: qa[qaIndex.moodFor].answer as FilterOptionEnum,
      genres: qa[qaIndex.genres].answer as string[],
      vibe: message,
    });

    if (recommendations.results.length > 0) {
      setQA(
        recommendations.results,
        qaIndex.recommendations,
        QAEnum.recommendations
      );
    }

    setMessage("");
  };

  // If genres are not selected, do not show the input
  if (qa[qaIndex.genres].answer === null)
    return <div className="gap-2 rounded-b-xl bg-lume-primary-darker py-6" />;

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-2 flex gap-2 rounded-b-xl bg-lume-primary-darker p-4"
    >
      <input
        type="text"
        className="border-solid border-lume-secondary-dark border-[1px] p-2 rounded-[10px] text-white text-sm bg-lume-primary-darker font-poppins font-[200] focus:outline-none w-full"
        placeholder="What are you in the mood for?"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        disabled={!validate()}
        type="submit"
        className="btn p-2 bg-lume-green/80 rounded-full"
      >
        <SendIcon className="w-6 h-6" />
      </button>
    </form>
  );
};

export default ChatBotInput;
