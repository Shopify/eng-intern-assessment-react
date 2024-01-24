import React from "react";
import StopWatchButton from "./StopWatchButton";

interface ControlButtonsProps {
  handleStart: () => void;
  handleReset: () => void;
  handlePauseResume: () => void;
  isPaused: boolean;
  active: boolean;
}

export default function ControlButtons({
  handleStart,
  handleReset,
  handlePauseResume,
  isPaused,
  active,
}: ControlButtonsProps) {
  const StartButtons = (
    <div className="btn-grp">
      <StopWatchButton
        children={"Lap"}
        isDisabled={false}
        onClick={() => console.log("Lap")}
        type={"dark"}
      />
      <StopWatchButton
        children={"Start"}
        isDisabled={false}
        onClick={handleStart}
        type={"primary"}
      />
    </div>
  );
  const ActiveButtons = (
    <div className="btn-grp">
      <StopWatchButton
        children={"Lap"}
        isDisabled={false}
        onClick={() => console.log("Lap")}
        type={"dark"}
      />
      <StopWatchButton
        children={"Stop"}
        isDisabled={false}
        onClick={handlePauseResume}
        type={"warning"}
      />
    </div>
  );
  const StopButtons = (
    <div className="btn-grp">
      <StopWatchButton
        children={"Reset"}
        isDisabled={false}
        onClick={handleReset}
        type={"dark"}
      />
      <StopWatchButton
        children={"Resume"}
        isDisabled={false}
        onClick={handlePauseResume}
        type={"primary"}
      />
    </div>
  );

  return (
    <div className="control-buttons">
      {!active ? StartButtons : isPaused ? StopButtons : ActiveButtons}
    </div>
  );
}
