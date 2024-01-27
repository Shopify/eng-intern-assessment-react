import React from "react";

interface StopWatchButtonProps {
  title: string;
  handleClick: () => void;
}

export default function StopWatchButton({
  title,
  handleClick,
}: StopWatchButtonProps) {
  return (
    <button
      className="stopwatch-button"
      onClick={() => handleClick()}
    >{`${title}`}</button>
  );
}
