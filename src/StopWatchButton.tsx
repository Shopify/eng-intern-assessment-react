import React from "react";

import {
  IconPlayerPlayFilled,
  IconPlayerPauseFilled,
  IconRestore,
  IconClockExclamation,
} from "@tabler/icons-react";

type StopWatchButtonProps = {
  isRunning: boolean;
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
  setTime: React.Dispatch<React.SetStateAction<number>>;
  setLaps: React.Dispatch<React.SetStateAction<number[]>>;
  time: number;
};

export default function StopWatchButton(props: StopWatchButtonProps) {
  return (
    <div className="flex gap-1 justify-between w-64">
      <button
        onClick={() => {
          props.setTime(0);
          props.setIsRunning(false);
          props.setLaps([]);
        }}
        disabled={props.time <= 0}
        className="rounded-md px-4 py-2 bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <IconRestore className="text-white" />
      </button>
      <button
        onClick={() => props.setIsRunning(!props.isRunning)}
        className={`rounded-md py-2 px-8 bg-slate-900`}
      >
        {props.isRunning ? (
          <IconPlayerPauseFilled className="text-white" />
        ) : (
          <IconPlayerPlayFilled className=" text-white" />
        )}
      </button>
      <button
        onClick={() => {
          props.setLaps((laps) => [...laps, props.time]);
        }}
        disabled={!props.isRunning}
        className={`rounded-md px-4 py-2 bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <IconClockExclamation className="text-white" />
      </button>
    </div>
  );
}
