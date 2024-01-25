import React from "react";

type buttonTypes = "start" | "stop" | "reset";

type buttonProps = {
  type: buttonTypes;
  onClick: () => void;
};

export default function StopWatchButton(props: buttonProps) {
  const { type, onClick } = props;
  return <button onClick={onClick}>{type.toUpperCase()}</button>;
}
