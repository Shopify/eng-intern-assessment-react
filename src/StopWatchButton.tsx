import "./styles/StopWatchButton.css";

import React, { MouseEventHandler } from "react";

export default function StopWatchButton({
  title,
  onPressed,
  isStart = false,
  isStop = false,
}: {
  title: string;
  onPressed: MouseEventHandler<HTMLButtonElement>;
  isStart?: boolean;
  isStop?: boolean;
}) {
  return (
    <div>
      <button
        className={`${isStart ? "startButton" : ""} ${
          isStop ? "stopButton" : ""
        }`}
        onClick={onPressed}
      >
        {title}
      </button>
    </div>
  );
}
