import { createStore } from "zustand-x";

import { GENRES, TV_GENRES } from "../const/genres";

import {
  type QA,
  QAEnum,
  qaState,
  qaIndex,
} from "../components/recommendations-chatbot/chatbot.helpers";

type ChatbotState = {
  qa: QA[];
  lastAnsweredIndex: number | null;
  isTyping: boolean;
};

export const chatbotStore = createStore<ChatbotState>(
  {
    qa: qaState,
    lastAnsweredIndex: null,
    isTyping: false,
  },
  {
    name: "chatbot",
    devtools: true,
    persist: true,
    mutative: true,
  }
).extendActions(({ set }) => ({
  setQA: (answer: string | string[], index: number, type?: QAEnum) => {
    set("state", (draft) => {
      const { qa } = draft;
      qa[index].answer = answer;

      if (type === QAEnum.moodFor) {
        const qaGenresIndex = qaIndex.genres;
        const genres = answer === "Movie" ? GENRES : TV_GENRES;
        qa[qaGenresIndex].predefinedAnswers = genres.map((g) => g.name);
      }

      if (type === QAEnum.recommendations) {
        const qaGenresIndex = qaIndex.recommendations;
        qa[qaGenresIndex].predefinedAnswers = answer;
      }

      return draft;
    });
  },
  clearQA: () => {
    set("state", (draft) => {
      draft.qa = qaState;
      return draft;
    });
  },
  setLastAnsweredIndex: (index: number) => {
    set("state", (draft) => {
      draft.lastAnsweredIndex = index;
      return draft;
    });
  },
  setIsTyping: (isTyping: boolean) => {
    set("state", (draft) => {
      draft.isTyping = isTyping;
      return draft;
    });
  },
}));
