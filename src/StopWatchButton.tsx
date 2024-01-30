import React from "react";
import "./styles.css";

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
      <button className="stopWatchBtn" onClick={onClick}>
        {title}
      </button>
    </div>
  );
}
