import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "motion/react";

import ChatBotAnswer from "./ChatBotAnswer";
import ChatBotQuestion from "./ChatBotQuestion";
import TypingIndicator from "../shared/TypingIndicator";

import { type QA } from "./chatbot.helpers";

export const ChatBotQA: React.FC<{
  qa: QA[];
  setQA: React.Dispatch<React.SetStateAction<QA[]>>;
}> = ({ qa, setQA }) => {
  const [isTyping, setIsTyping] = useState(false);
  const [lastAnsweredIndex, setLastAnsweredIndex] = useState<number | null>(
    null
  );
  const endRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom
  useEffect(() => {
    if (endRef.current) endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [qa, isTyping]);

  // ✅ Show typing *only* when a question was just answered AND a next question exists
  useEffect(() => {
    if (lastAnsweredIndex === null) return;
    const nextIndex = lastAnsweredIndex + 1;
    if (nextIndex < qa.length) {
      setIsTyping(true);
      const timeout = setTimeout(() => {
        setIsTyping(false);
        setLastAnsweredIndex(null);
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [lastAnsweredIndex, qa.length]);

  // How many to render
  const answeredCount = qa.findIndex((q) => q.answer === null);

  let renderCount;
  if (isTyping) {
    // Pause showing new question until typing is done
    renderCount = answeredCount;
  } else if (answeredCount === -1) {
    // If no questions have been answered yet, show all questions
    renderCount = qa.length;
  } else {
    // Show one more than the number of answered questions
    renderCount = answeredCount + 1;
  }

  return (
    <div className="flex-1 overflow-y-auto space-y-4 p-2 max-h-[400px]">
      <AnimatePresence mode="popLayout">
        {qa.slice(0, renderCount).map((item, index) => (
          <React.Fragment key={item.id}>
            <ChatBotQuestion
              qaItem={item}
              index={index}
              setQA={setQA}
              setLastAnsweredIndex={setLastAnsweredIndex}
            />
            {item.answer && <ChatBotAnswer qaItem={item} />}
          </React.Fragment>
        ))}

        {isTyping && <TypingIndicator />}
      </AnimatePresence>
      <div ref={endRef} />
    </div>
  );
};

export default ChatBotQA;
