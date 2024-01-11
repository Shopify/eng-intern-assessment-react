import React from "react";

interface StopWatchButtonProps {
  onClick: () => void;
  label: string;
}

export default function StopWatchButton({ onClick, label }: StopWatchButtonProps) {
  return (
    <button onClick={onClick}>{label}</button>
  );
}
