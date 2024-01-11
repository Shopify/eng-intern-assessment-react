import React from "react";

interface StopWatchButtonProps {
  label: string;
  onButtonClick: () => void;
}

export default function StopWatchButton({
  label,
  onButtonClick,
}: StopWatchButtonProps) {
  return (
    <div>
      <button onClick={onButtonClick}>{label}</button>
    </div>
  );
}
