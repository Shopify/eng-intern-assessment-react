import React from "react";

interface StopWatchButtonInterface {
  handleClick: () => void;
  label: string;
  clickable: boolean;
}

export default function StopWatchButton({
  label,
  handleClick,
  clickable,
}: StopWatchButtonInterface) {
  return (
    <div>
      <button disabled={!clickable} onClick={handleClick}>
        {label}
      </button>
    </div>
  );
}
