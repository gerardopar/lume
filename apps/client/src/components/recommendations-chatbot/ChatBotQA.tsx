import React, { useState } from "react";
import { GENRES, TV_GENRES } from "../../const/genres";

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
}

const qaState: QA[] = [
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
    predefinedAnswers: [], // genres will be fetched from const/genres.ts
    answer: null,
    type: QAEnum.genres,
  },
];

export const Question: React.FC<{
  qaItem: QA;
  index: number;
  setQA: React.Dispatch<React.SetStateAction<QA[]>>;
}> = ({ qaItem, index, setQA }) => {
  const [genresSelected, setGenresSelected] = useState<string[]>([]);

  const handleAnswer = (
    answer: string | string[],
    index: number,
    type?: QAEnum
  ) => {
    setQA((prevQA) => {
      const newQA = [...prevQA];
      newQA[index].answer = answer;

      // get the genres based on the moodFor answer
      if (type === QAEnum.moodFor) {
        const qaGenresIndex = qaState.findIndex(
          (qa) => qa.type === QAEnum.genres
        );
        const genres = answer === "Movie" ? GENRES : TV_GENRES;
        newQA[qaGenresIndex].predefinedAnswers = genres.map(
          (genre) => genre.name
        );
      }

      return newQA;
    });
  };

  return (
    <div className="w-full flex items-start justify-center flex-col">
      <p className="text-sm font-poppins font-[200] bg-lume-primary-darker py-2 px-4 rounded-2xl inline text-left rounded-bl-none">
        {qaItem.question}
      </p>
      {qaItem.predefinedAnswers && (
        <div className="flex flex-wrap gap-1 rounded-2xl mt-2">
          {Array.isArray(qaItem.predefinedAnswers)
            ? qaItem.predefinedAnswers.map((answer) => {
                let activeStyles = "";
                let disabledStyles = "";

                if (qaItem.answer && qaItem.type === QAEnum.moodFor) {
                  if (qaItem.answer === answer) {
                    activeStyles = "bg-lume-green text-white";
                  } else {
                    disabledStyles = "opacity-50 cursor-not-allowed";
                  }
                } else if (qaItem.type === QAEnum.genres) {
                  if (genresSelected.includes(answer)) {
                    activeStyles = "bg-lume-green text-white";
                  }

                  if (qaItem.answer && !genresSelected.includes(answer)) {
                    disabledStyles = "opacity-50 cursor-not-allowed";
                  }
                }

                const onClick = () => {
                  if (qaItem.type === QAEnum.genres) {
                    if (genresSelected.includes(answer)) {
                      setGenresSelected((prev) =>
                        prev.filter((genre) => genre !== answer)
                      );
                      return;
                    }
                    setGenresSelected((prev) => [...prev, answer]);
                    return;
                  }

                  handleAnswer(answer, index, qaItem.type);
                  return;
                };

                return (
                  <button
                    key={answer}
                    disabled={!!qaItem.answer}
                    onClick={onClick}
                    className={`text-sm font-poppins font-[200] border-lume-green border p-2 px-4 py-1 rounded-full ${activeStyles} ${disabledStyles}`}
                  >
                    {answer}
                  </button>
                );
              })
            : qaItem.predefinedAnswers}
          {qaItem.type === QAEnum.genres && !qaItem.answer && (
            <div className="flex items-center justify-center w-full mt-2 gap-2">
              <button
                onClick={() => handleAnswer([], index, qaItem.type)}
                className="text-sm font-poppins font-[200] p-2 px-4 py-1 rounded-[10px] bg-gray-500"
              >
                Skip
              </button>
              <button
                onClick={() => handleAnswer(genresSelected, index, qaItem.type)}
                className="text-sm bg-lume-primary-darker font-poppins font-[200] p-2 px-4 py-1 rounded-[10px]"
              >
                Confirm
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const Answer: React.FC<{
  qaItem: QA;
  index: number;
  setQA: React.Dispatch<React.SetStateAction<QA[]>>;
}> = ({ qaItem, index, setQA }) => {
  const answer = Array.isArray(qaItem.answer)
    ? qaItem.answer.join(", ")
    : qaItem.answer;

  if (!answer) return <></>;

  return (
    <div className="w-full flex items-center justify-end">
      <p className="text-sm font-poppins font-[200] bg-lume-primary-darker py-2 px-4  rounded-2xl inline text-left rounded-br-none">
        {answer}
      </p>
    </div>
  );
};

export const ChatBotQA: React.FC = () => {
  const [qa, setQA] = useState<QA[]>(qaState);

  console.log(qa);

  return (
    <div className="flex-1 overflow-y-auto space-y-2 p-2 max-h-[400px]">
      {qa.map((item, index) => (
        <>
          <Question qaItem={item} index={index} setQA={setQA} />
          {item.answer && <Answer qaItem={item} index={index} setQA={setQA} />}
        </>
      ))}
    </div>
  );
};

export default ChatBotQA;
