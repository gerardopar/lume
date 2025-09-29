import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";

import MessageBubbleIcon from "../svgs/MessageBubbleIcon";
import ChatBot from "./ChatBot";

export const ChatBotTrigger: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="z-50" ref={wrapperRef}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chatbot"
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`absolute bottom-[80px] right-4  max-mobile-768:bottom-[140px]
              w-full max-w-[400px] max-mobile-768:max-w-[400px] max-mobile-425:max-w-[90%] max-mobile-375:max-w-[90%]
              bg-lume-secondary-dark p-4 rounded-xl shadow-2xl`}
          >
            <ChatBot onClose={() => setIsOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-4 right-4 h-12 w-12 rounded-full overflow-hidden shadow-2xl flex items-center justify-center max-mobile-768:bottom-[80px]">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full h-full flex items-center justify-center bg-lume-green hover:bg-lume-green/80 transition-colors cursor-pointer"
        >
          <MessageBubbleIcon />
        </button>
      </div>
    </div>
  );
};

export default ChatBotTrigger;
