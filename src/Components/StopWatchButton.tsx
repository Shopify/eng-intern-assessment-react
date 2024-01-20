// A separate component that represents the start, stop, and reset buttons.

import React from "react";

interface StopWatchButtonProps {
  onClick?: () => void;
  label: string;
}

export default function StopWatchButton({
  label,
  onClick,
}: StopWatchButtonProps) {
  return (
    <button className="btn" onClick={onClick}>
      {label}
    </button>
  );
}
