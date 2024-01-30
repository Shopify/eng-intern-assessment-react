import React from "react";
interface StopwatchButtonProps {
  onClick: () => void;
  label: string;
  condition?: boolean;
}

export default function StopWatchButton({
  onClick,
  label,
  condition = true,
}: StopwatchButtonProps) {
  if (!condition) {
    return null; // Render nothing if condition is false
  }
  return <button onClick={onClick}>{label}</button>;
}
