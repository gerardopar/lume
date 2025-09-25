import React from "react";
import { useNavigate } from "react-router-dom";

import Lottie from "lottie-react";
import emptyWatchlistAnimation from "../../components/lotties/404-not-found.json";

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <Lottie
        animationData={emptyWatchlistAnimation}
        loop
        autoplay
        className="w-[60%] max-mobile-768:w-[100%] h-full"
      />

      <button
        type="button"
        onClick={() => navigate("/")}
        className="bg-lume-green/90 text-white px-6 py-2 rounded-[10px] cursor-pointer hover:bg-lume-green/60 transition-colors duration-200 ease-in-out mr-2"
      >
        Return Home
      </button>
    </div>
  );
};

export default NotFound;
