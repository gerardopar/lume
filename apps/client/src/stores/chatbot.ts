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
  genresSelected: string[];
  lastAnsweredIndex: number | null;
  isTyping: boolean;
};

export const chatbotStore = createStore<ChatbotState>(
  {
    qa: qaState,
    genresSelected: [],
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
      draft.genresSelected = [];
      draft.lastAnsweredIndex = null;
      draft.isTyping = false;
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
  setGenresSelected: (genre: string) => {
    set("state", (draft) => {
      const existingGenres = draft.genresSelected || [];

      if (existingGenres?.includes(genre)) {
        draft.genresSelected = existingGenres.filter((g) => g !== genre);
      } else {
        draft.genresSelected = [...existingGenres, genre];
      }

      return draft;
    });
  },
}));
