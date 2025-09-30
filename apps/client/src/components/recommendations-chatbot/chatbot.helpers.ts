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
}

export const qaState: QA[] = [
  {
    id: 1,
    question: "What are you in the mood for?",
    predefinedAnswers: ["Movie", "TV Show"],
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
];
