import React from "react";
import { motion } from "motion/react";

const TypingIndicator: React.FC = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="flex items-center gap-2 bg-lume-primary-darker px-4 py-2 rounded-2xl rounded-bl-none w-fit"
  >
    <div className="flex gap-1">
      <div className="w-2 h-2 bg-lume-green rounded-full animate-bounce [animation-delay:-0.2s]" />
      <div className="w-2 h-2 bg-lume-green rounded-full animate-bounce [animation-delay:-0.1s]" />
      <div className="w-2 h-2 bg-lume-green rounded-full animate-bounce" />
    </div>
  </motion.div>
);

export default TypingIndicator;
