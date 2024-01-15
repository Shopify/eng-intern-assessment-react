import React from "react";
import useStopwatch from "./hooks/useStopwatch";
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
          color: "white",
        }}
      >
        Start
      </Button>
      <Button
        onClick={stop}
        disabled={!isActive}
        style={{
          background: !isActive ? "gray" : "red",
          color: "white",
        }}
      >
        Stop
      </Button>
      <Button
        onClick={reset}
        disabled={!isActive && !timer}
        style={{
          background: !isActive && !timer ? "gray" : "blue",
          color: "white",
        }}
      >
        Reset
      </Button>
      <Button
        onClick={lap}
        disabled={!isActive && !timer}
        style={{
          background: !isActive && !timer ? "gray" : "purple",
          color: "white",
        }}
      >
        Lap
      </Button>
    </div>
  );
}
