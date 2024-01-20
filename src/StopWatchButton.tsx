import React from "react";

interface StopWatchButtonProps {
  type: string;
  onBtnClick(): void;
  isDisabled: boolean;
}

export default function StopWatchButton({
  type,
  onBtnClick,
  isDisabled,
}: StopWatchButtonProps) {
  return (
    <button disabled={isDisabled} className="btn" onClick={onBtnClick}>
      {type}
    </button>
  );
}
