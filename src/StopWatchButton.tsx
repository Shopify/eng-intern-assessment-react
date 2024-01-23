import React from "react";
import "./StopWatchButton.css"
interface StopwatchButtonProps {
  label: string;
  onClick: () => void;
}

export default function StopWatchButton({
  label,
  onClick,
}: StopwatchButtonProps) {
  return <button className="stopwatch-button" onClick={onClick}>{label}</button>;
}