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
    <div className="flex gap-1">
      <button
        onClick={() => props.setIsRunning(!props.isRunning)}
        className={`rounded-md px-4 py-2 ${
          props.isRunning ? "bg-red-400" : "bg-green-400"
        }`}
      >
        {props.isRunning ? "Stop" : "Start"}
      </button>
      <button
        onClick={() => {
          props.setTime(0);
          props.setIsRunning(false);
          props.setLaps([]);
        }}
        className="rounded-md px-4 py-2 bg-yellow-400"
      >
        Reset
      </button>
      {props.isRunning && (
        <button
          onClick={() => {
            props.setLaps((laps) => [...laps, props.time]);
          }}
          className="rounded-md px-4 py-2 bg-sky-400"
        >
          Lap
        </button>
      )}
    </div>
  );
}
