import React from "react";

interface StopwatchButtonProps {
  onClick: () => void;
  label: string;
}

export default function StopWatchButton(props: StopwatchButtonProps) {
  return (
    <div>
      <button onClick={props.onClick}>{props.label}</button>
    </div>
  );
}
