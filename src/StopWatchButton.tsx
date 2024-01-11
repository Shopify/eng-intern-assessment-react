import React from "react";

interface StopWatchButtonProps {
  label: string;
  color: string;
  disabled: boolean;
  onButtonClick: () => void;
}

export default function StopWatchButton({
  label,
  color,
  disabled,
  onButtonClick,
}: StopWatchButtonProps) {
  return (
    <div>
      <button
        className={`button ${color}`}
        disabled={disabled}
        onClick={onButtonClick}
      >
        {label}
      </button>
    </div>
  );
}
