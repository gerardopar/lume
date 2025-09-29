import React from "react";

import LogoText from "../shared/LogoText";
import CloseButton from "../shared/CloseButton";

export const ChatBotHeader: React.FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  return (
    <div className="flex justify-between items-center mb-2 bg-lume-primary-darker p-4 rounded-t-xl">
      <div className="flex items-center gap-2">
        <LogoText className="text-xl font-bold" />
        <span className="text-xl font-bold">Assistant</span>
      </div>
      <CloseButton onClick={onClose} />
    </div>
  );
};

export default ChatBotHeader;
