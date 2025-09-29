type RecommendationsChatBotProps = {
  onClose: () => void;
};

const RecommendationsChatBot: React.FC<RecommendationsChatBotProps> = ({
  onClose,
}) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold">🎬 Recommender</h2>
        <button onClick={onClose} className="text-sm hover:underline">
          Close
        </button>
      </div>

      {/* Replace with your real chat UI */}
      <div className="flex-1 overflow-y-auto space-y-2">
        <div className="chat chat-start">
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
          Send
        </button>
      </form>
    </div>
  );
};

export default RecommendationsChatBot;
