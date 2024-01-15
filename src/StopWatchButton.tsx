import React from "react";
import Button from "./components/Button";

export default function StopWatchButton({
  start,
  stop,
  reset,
  lap,
  isActive,
  timer,
}: {
  start: () => void;
  stop: () => void;
  reset: () => void;
  lap: () => void;
  isActive: boolean;
  timer: number;
}) {
  return (
    <div style={{ marginTop: "20px" }}>
      <Button
        onClick={start}
        disabled={isActive}
        style={{
          background: isActive ? "gray" : "green",
        }}
      >
        Start
      </Button>
      <Button
        onClick={stop}
        disabled={!isActive}
        style={{
          background: !isActive ? "gray" : "red",
        }}
      >
        Stop
      </Button>
      <Button
        onClick={reset}
        disabled={!isActive && !timer}
        style={{
          background: !isActive && !timer ? "gray" : "blue",
        }}
      >
        Reset
      </Button>
      <Button
        onClick={lap}
        disabled={!isActive && !timer}
        style={{
          background: !isActive && !timer ? "gray" : "purple",
        }}
      >
        Lap
      </Button>
    </div>
  );
}
