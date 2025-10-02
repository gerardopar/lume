import { FilterOptionEnum } from "@components/SuggestionsInput/suggestions-input.helpers";

export type QA = {
  id: number;
  question: string;
  predefinedAnswers: null | string | string[];
  answer: null | string | string[];
  type: QAEnum;
};

export enum QAEnum {
  moodFor = "moodFor",
  genres = "genres",
  moodDescription = "moodDescription",
  recommendations = "recommendations",
}

export const qaState: QA[] = [
  {
    id: 1,
    question: "What are you in the mood for? 🍿",
    predefinedAnswers: [FilterOptionEnum.Movies, FilterOptionEnum.TV],
    answer: null,
    type: QAEnum.moodFor,
  },
  {
    id: 2,
    question: "What genres are you in the mood for?",
    predefinedAnswers: [],
    answer: null,
    type: QAEnum.genres,
  },
  {
    id: 3,
    question: "Describe the vibe you're going for?",
    predefinedAnswers: null,
    answer: null,
    type: QAEnum.moodDescription,
  },
  {
    id: 4,
    question: "Based on your answers, here are some recommendations 🤗",
    predefinedAnswers: null,
    answer: null,
    type: QAEnum.recommendations,
  },
];
