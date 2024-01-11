import React from "react";

interface StopWatchButtonInterface {
  handleClick: () => void;
  label: string;
}

export default function StopWatchButton({
  label,
  handleClick,
}: StopWatchButtonInterface) {
  return (
    <div>
      <button onClick={handleClick}>{label}</button>
    </div>
  );
}
