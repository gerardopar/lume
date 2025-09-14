import React from "react";
import ReactPlayer from "react-player";

interface VideoPlayerProps {
  videoKey: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoKey }) => {
  return (
    <ReactPlayer
      src={`https://www.youtube.com/watch?v=${videoKey}`}
      playing
      muted
      loop
      controls={false}
      width="100%"
      height="100%"
    />
  );
};

export default VideoPlayer;
