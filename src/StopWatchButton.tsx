import React from "react";

interface StopWatchButtonProp {
  // text for button
  title: string;
}

export default function StopWatchButton({ title }: StopWatchButtonProp) {
  return (
    <div>
      <button>{title}</button>
    </div>
  );
}
