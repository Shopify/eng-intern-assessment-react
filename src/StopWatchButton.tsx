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
      onClick={() => handleClick()}
    >{`StopWatch Button - ${title}`}</button>
  );
}
