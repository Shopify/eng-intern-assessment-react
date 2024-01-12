import "./styles/StopWatchButton.css";

import React, { MouseEventHandler } from "react";

export default function StopWatchButton({
  title,
  onPressed,
  className,
}: {
  title: string;
  onPressed: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  backgroundColor?: string;
}) {
  return (
    <div>
      <button className={className ? className : ""} onClick={onPressed}>
        {title}
      </button>
    </div>
  );
}
