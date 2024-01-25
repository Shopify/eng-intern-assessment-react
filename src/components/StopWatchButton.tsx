import React from "react";

export default function StopWatchButton({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) {
  return <button onClick={onClick}>{text}</button>;
}
