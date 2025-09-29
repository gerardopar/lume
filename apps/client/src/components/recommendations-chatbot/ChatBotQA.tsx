import React from "react";

export const ChatBotQA: React.FC = () => {
  return (
    <div className="flex-1 overflow-y-auto space-y-2 p-2">
      <div className="chat chat-start">
        <div className="chat-bubble">Hi! What are you in the mood for?</div>
      </div>
      <div className="chat chat-end">
        <div className="chat-bubble">Hi! What are you in the mood for?</div>
      </div>
    </div>
  );
};

export default ChatBotQA;
