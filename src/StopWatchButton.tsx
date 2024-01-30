import { ButtonGroup, Button } from "@shopify/polaris";
import React from "react";

// prop types for StopWatchButton
type ButtonProps = {
  start: string;
  stop: string;
  reset: string;
  lap: string;
  isRunning: boolean;
  onStartStop: () => void;
  onReset: () => void;
  onLap: () => void;
};

export default function StopWatchButton({
  start,
  stop,
  reset,
  lap,
  isRunning,
  onStartStop,
  onReset,
  onLap,
}: ButtonProps) {
  return (
    // button group for start, stop, reset, and lap buttons
    // button group from polaris
    <div className="my-4 mx-2"> 
      <ButtonGroup variant="segmented">
        {/* start stop button */}
        <Button
          onClick={onStartStop}
          accessibilityLabel={isRunning ? "Stop" : "Start"}
          textAlign="center"
          size="large"
          tone={isRunning ? "critical" : "success"}
        >
          {isRunning ? stop : start}
        </Button>
        {/* reset button */}
        <Button
          onClick={onReset}
          accessibilityLabel="Reset"
          textAlign="center"
          size="large"
        >
          {reset}
        </Button>
        {/* lap button */}
        <Button
          onClick={onLap}
          accessibilityLabel="Lap"
          disabled={!isRunning}
          textAlign="center"
          size="large"
        >
          {lap}
        </Button>
      </ButtonGroup>
    </div>
  );
}
