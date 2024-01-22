import React from "react";

interface StopWatchButtonProps {
  text: string;
  onClick: () => void;
}

export default function StopWatchButton({
  text,
  onClick,
}: StopWatchButtonProps) {
  return <div onClick={onClick}>{text}</div>;
}
