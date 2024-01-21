import React from "react";

type Props = {
  onClick: () => void;
  isCounting: boolean;
};

export default function StopWatchButton({ onClick, isCounting }: Props) {
  return <div onClick={onClick}>{isCounting ? "Stop" : "Start"}</div>;
}
