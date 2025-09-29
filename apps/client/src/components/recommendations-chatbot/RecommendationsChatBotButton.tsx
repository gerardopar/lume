import React from "react";

import MessageBubbleIcon from "../svgs/MessageBubbleIcon";

export const RecommendationsChatBotButton: React.FC = () => {
  return (
    <div className="absolute flex items-center justify-center max-mobile-768:bottom-[80px] bottom-4 right-4 rounded-full shadow-2xl overflow-hidden h-12 w-12 z-50">
      <button className="w-full h-full flex items-center justify-center bg-lume-green hover:bg-lume-green/80 transition-colors cursor-pointer">
        <MessageBubbleIcon />
      </button>
    </div>
  );
};

export default RecommendationsChatBotButton;
