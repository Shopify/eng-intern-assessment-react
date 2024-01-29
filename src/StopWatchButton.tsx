import React from "react";

// Importing icons for the buttons
import {
  IconPlayerPlayFilled,
  IconPlayerPauseFilled,
  IconRestore,
  IconClockExclamation,
} from "@tabler/icons-react";

// Defining the props for the StopWatchButton component
type StopWatchButtonProps = {
  isRunning: boolean; // State variable for tracking if the stopwatch is currently running
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>; // Function to set the isRunning state variable
  setTime: React.Dispatch<React.SetStateAction<number>>; // Function to set the time state variable
  setLaps: React.Dispatch<React.SetStateAction<number[]>>; // Function to set the laps state variable
  time: number; // State variable for tracking time in milliseconds
};

// StopWatchButton component
export default function StopWatchButton(props: StopWatchButtonProps) {
  return (
    <div className="flex gap-1 justify-between w-64">
      {/* Reset button, resets time, stops the stopwatch, and clears laps */}
      <button
        onClick={() => {
          props.setTime(0);
          props.setIsRunning(false);
          props.setLaps([]);
        }}
        disabled={props.time <= 0} // Disabled when time is 0 or less
        className="transition duration-75 ease-in hover:enabled:-translate-y-0.5 hover:enabled:scale-110 shadow-slate-400 shadow-md hover:enabled:shadow-indigo-950 rounded-md px-4 py-2 bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
        data-testid="reset-button"
      >
        <IconRestore className="text-white" />
      </button>
      {/* Start/Stop button, toggles the isRunning state variable */}
      <button
        onClick={() => props.setIsRunning(!props.isRunning)}
        className={`transition duration-75 ease-in hover:enabled:-translate-y-0.5 hover:enabled:scale-110 shadow-slate-400 shadow-md hover:enabled:shadow-indigo-950 rounded-md py-2 px-8 bg-slate-900`}
        data-testid="start-stop-button"
      >
        {props.isRunning ? (
          <IconPlayerPauseFilled
            data-testid="pause-icon"
            className="text-white"
          /> // Pause icon when the stopwatch is running
        ) : (
          <IconPlayerPlayFilled
            data-testid="play-icon"
            className=" text-white"
          /> // Play icon when the stopwatch is not running
        )}
      </button>
      {/* Lap button, adds the current time to the laps array */}
      <button
        onClick={() => {
          props.setLaps((laps) => [...laps, props.time]);
        }}
        disabled={!props.isRunning} // Disabled when the stopwatch is not running
        className={`transition duration-75 ease-in hover:enabled:-translate-y-0.5 hover:enabled:scale-110 shadow-slate-400 shadow-md hover:enabled:shadow-indigo-950 rounded-md px-4 py-2 bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed`}
        data-testid="lap-button"
      >
        <IconClockExclamation className="text-white" />
      </button>
    </div>
  );
}
