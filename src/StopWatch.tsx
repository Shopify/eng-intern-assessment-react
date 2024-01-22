import React from "react";

interface StopWatchProps {
  elapsedTime: number;
}

export default function StopWatch({ elapsedTime }: StopWatchProps) {
  const centiseconds = elapsedTime % 100;
  const seconds = Math.floor(elapsedTime / 100) % 60;
  const minutes = Math.floor(elapsedTime / 6000) % 60;
  const hours = Math.floor(elapsedTime / 360000);

  const formatTime = (num: number) => {
    return num.toString().padStart(2, "0");
  };

  return (
    <div>
      <span>
        {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}
      </span>
      <span>.{formatTime(centiseconds)}</span>
    </div>
  );
}
