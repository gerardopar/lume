import React from "react";

import SendIcon from "../svgs/SendIcon";
import ChatBotHeader from "./ChatBotHeader";

type RecommendationsChatBotProps = {
  onClose: () => void;
};

const RecommendationsChatBot: React.FC<RecommendationsChatBotProps> = ({
  onClose,
}) => {
  return (
    <div className="flex flex-col h-full w-full">
      <ChatBotHeader onClose={onClose} />

      <div className="flex-1 overflow-y-auto space-y-2">
        <div className="chat chat-start">
          <div className="chat-bubble">Hi! What are you in the mood for?</div>
        </div>
        <div className="chat chat-end">
          <div className="chat-bubble">Hi! What are you in the mood for?</div>
        </div>
      </div>

      <form className="mt-2 flex gap-2">
        <input
          type="text"
          className="input input-bordered input-sm w-full"
          placeholder="Ask me anything..."
        />
        <button type="submit" className="btn btn-sm btn-primary">
          <SendIcon />
        </button>
      </form>
    </div>
  );
};

export default RecommendationsChatBot;
