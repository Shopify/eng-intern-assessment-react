import React from "react";

interface StopWatchButtonProps {
  name: string;
  handleClick: () => void;
  running: boolean;
}

export default function StopWatchButton({
  name,
  handleClick,
  running,
}: StopWatchButtonProps) {
  return (
    <button
      data-testid={`${name.toLowerCase()}-button`}
      className="button-design"
      onClick={handleClick}
      disabled={name === "Record Lap" && !running}
    >
      {name}
    </button>
  );
}
