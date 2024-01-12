import React, { MouseEventHandler } from "react";

export default function StopWatchButton({
  title,
  onPressed,
}: {
  title: string;
  onPressed: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <div>
      <button onClick={onPressed}>{title}</button>
    </div>
  );
}
