import React, { useState, useEffect, useRef } from "react";
import StopWatchButton from "./StopWatchButton";
import "./../css/MusicControl.css";
import SoundFile from "./../../public/media/The Human Abstract - Crossing The Rubicon 8-Bit.mp3";

const MusicControl: React.FC = () => {
  // state for music control
  // isPlaying is false by default
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio(SoundFile));

  useEffect(() => {
    audioRef.current.volume = 0.2; // set volume to 20%
  }, []);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="music-control" aria-label="Music control">
      <StopWatchButton
        action={toggleMusic}
        label={isPlaying ? "Music Off" : "Music On"}
        ariaLabel={isPlaying ? "Turn music off" : "Turn music on"}
      />
    </div>
  );
};

export default MusicControl;
