import React from "react";

interface StopWatchButtonProps {
  // text for button
  title: string;
  // onClick property for button
  onClick: () => void;
}

export default function StopWatchButton({
  title,
  onClick,
}: StopWatchButtonProps) {
  return (
    <div>
      <button onClick={onClick}>{title}</button>
    </div>
  );
}
