import React, { useState } from "react";
import { trpc } from "@utils/trpc";
import { z } from "zod";

import SendIcon from "../svgs/SendIcon";

import { type QA, qaIndex } from "./chatbot.helpers";
import type { FilterOptionEnum } from "@components/SuggestionsInput/suggestions-input.helpers";

const ChatBotInput: React.FC<{
  qa: QA[];
  setQA: React.Dispatch<React.SetStateAction<QA[]>>;
}> = ({ qa, setQA }) => {
  const [message, setMessage] = useState<string>("");

  const { mutateAsync: getAiRecommendations } =
    trpc.ai.getAiRecommendations.useMutation();

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

    setQA((prevQA) => {
      const newQA = [...prevQA];
      newQA[qaIndex.moodDescription].answer = message;
      return newQA;
    });
    setMessage("");

    const recommendations = await getAiRecommendations({
      type: qa[qaIndex.moodFor].answer as FilterOptionEnum,
      genres: qa[qaIndex.genres].answer as string[],
      vibe: message,
    });

    console.log("popcorn", recommendations);

    if (recommendations.titles.length > 0) {
      setQA((prevQA) => {
        const newQA = [...prevQA];
        newQA[qaIndex.recommendations].predefinedAnswers =
          recommendations.titles;
        return newQA;
      });
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
