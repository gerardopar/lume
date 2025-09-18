import React from "react";
import { useNavigate } from "react-router-dom";

import Lottie from "lottie-react";

import emptyWatchlistAnimation from "../../components/lotties/panda-popcorn.json";

export const WatchListPlaceholder: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-start mt-[100px] flex-1 flex-col">
      <Lottie
        animationData={emptyWatchlistAnimation}
        loop
        autoplay
        className="w-64 h-64"
      />
      <h2 className="text-xl font-inter font-semibold mb-2 text-white">
        Your watchlist is empty
      </h2>
      <p className="mb-6 text-gray-400 font-poppins font-[200] text-base">
        Save movies and TV shows you want to watch later.
      </p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="bg-lume-green/90 text-white px-6 py-2 rounded-[10px] cursor-pointer hover:bg-lume-green/60 transition-colors duration-200 ease-in-out mr-2"
        >
          Browse Movies
        </button>
        <button
          type="button"
          onClick={() => navigate("/tv-shows")}
          className="bg-lume-green/90 text-white px-6 py-2 rounded-[10px] cursor-pointer hover:bg-lume-green/60 transition-colors duration-200 ease-in-out"
        >
          Browse TV Shows
        </button>
      </div>
    </div>
  );
};

export default WatchListPlaceholder;
