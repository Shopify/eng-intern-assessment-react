import React from "react";

interface StopWatchButtonInterface {
  name: string;
  handleClick: () => void;
  label: string;
  clickable: boolean;
}

export default function StopWatchButton({
  name,
  label,
  handleClick,
  clickable,
}: StopWatchButtonInterface) {
  return (
    <div>
      <button className={name} disabled={!clickable} onClick={handleClick}>
        {label}
      </button>
    </div>
  );
}
