import React, { useState } from "react";
import { z } from "zod";

import SendIcon from "../svgs/SendIcon";

const ChatBotInput: React.FC<{ onSubmit: (e: React.FormEvent) => void }> = ({
  onSubmit,
}) => {
  const [message, setMessage] = useState<string>("");

  const validate = () => {
    const result = z.string().min(1).safeParse(message);

    if (!result.success) {
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(e);
    setMessage("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-2 flex gap-2 rounded-b-xl bg-lume-primary-darker p-4"
    >
      <input
        type="text"
        className="border-solid border-lume-secondary-dark border-[1px] p-2 rounded-[10px] text-white text-sm bg-lume-primary-darker font-poppins font-[200] focus:outline-none w-full"
        placeholder="What are you in the mood for?"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        disabled={!validate()}
        type="submit"
        className="btn p-2 bg-lume-green/80 rounded-full"
      >
        <SendIcon className="w-6 h-6" />
      </button>
    </form>
  );
};

export default ChatBotInput;
