import React from "react";
import ReactPlayer from "react-player";

interface VideoPlayerProps {
  videoKey: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoKey }) => {
  return (
    <div className="absolute right-0 top-0 w-1/2 h-full z-0 overflow-hidden">
      <div className="w-full h-full">
        <ReactPlayer
          src={`https://www.youtube.com/watch?v=${videoKey}`}
          controls={false}
          playing
          muted
          height="100%"
          width="100%"
          loop
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
