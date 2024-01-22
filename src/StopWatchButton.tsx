import React from "react";

interface StopwatchButtonProps {
  label: string;
  onClick: () => void;
}

export default function StopWatchButton({
  label,
  onClick,
}: StopwatchButtonProps) {
  return <button onClick={onClick}>{label}</button>;
}