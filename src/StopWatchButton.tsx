import React from "react";

type StopWatchButtonProps = {
  isRunning: boolean;
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
  setTime: React.Dispatch<React.SetStateAction<number>>;
  setLaps: React.Dispatch<React.SetStateAction<number[]>>;
  time: number;
};

export default function StopWatchButton(props: StopWatchButtonProps) {
  return (
    <>
      <button onClick={() => props.setIsRunning(!props.isRunning)}>
        {props.isRunning ? "Stop" : "Start"}
      </button>
      <button
        onClick={() => {
          props.setTime(0);
          props.setIsRunning(false);
          props.setLaps([]);
        }}
      >
        Reset
      </button>
      {props.isRunning && (
        <button
          onClick={() => {
            props.setLaps((laps) => [...laps, props.time]);
          }}
        >
          Lap
        </button>
      )}
    </>
  );
}
