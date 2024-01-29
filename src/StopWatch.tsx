import React, { useEffect, useState } from "react";
import StopWatchButton from "./StopWatchButton";

export default function StopWatch() {
  // State variable for tracking time in milliseconds
  const [time, setTime] = useState(0);

  // State variable for tracking if the stopwatch is currently running
  const [isRunning, setIsRunning] = useState(false);

  // State variable for tracking laps, each lap is stored as the time in milliseconds
  const [laps, setLaps] = useState<number[]>([]);

  // useEffect hook that runs every time isRunning or time changes
  useEffect(() => {
    if (isRunning) {
      // If the stopwatch is running, increment time by 1 every 10 milliseconds
      const interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 10);
      // Cleanup function to clear the interval when the stopwatch stops
      return () => clearInterval(interval);
    }
  }, [isRunning, time]);

  // Convert time to hours, minutes, seconds, and milliseconds
  const hours = Math.floor(time / 360000);
  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const milliseconds = time % 100;

  // Reverse the laps array to display the most recent lap first
  const reversedLaps = laps.slice().reverse();

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Display the time in hours, minutes, seconds, and milliseconds */}
      <div className="flex gap-2 items-end">
        <div className="border-2 text-3xl w-28 h-28 flex flex-col justify-center items-center rounded-md">
          <div data-testid="hours-display">
            {hours.toString().padStart(2, "0")}
          </div>
          <p className="text-sm font-semibold">hr</p>
        </div>
        <div className="border-2 text-3xl w-28 h-28 flex flex-col justify-center items-center rounded-md">
          <div data-testid="minutes-display">
            {minutes.toString().padStart(2, "0")}
          </div>
          <p className="text-sm font-semibold">min</p>
        </div>
        <div className="border-2 text-3xl w-28 h-28 flex flex-col justify-center items-center rounded-md">
          <div data-testid="seconds-display">
            {seconds.toString().padStart(2, "0")}
          </div>
          <p className="text-sm font-semibold">sec</p>
        </div>
        <div className="border-2 text-xl w-20 h-20 flex flex-col justify-center items-center rounded-md">
          <div data-testid="milliseconds-display">
            {milliseconds.toString().padStart(2, "0")}
          </div>
          <p className="text-sm">ms</p>
        </div>
      </div>
      {/* Stopwatch control buttons */}
      <StopWatchButton
        isRunning={isRunning}
        setIsRunning={setIsRunning}
        setTime={setTime}
        setLaps={setLaps}
        time={time}
      />
      {/* Display the list of laps */}
      <div className="w-[60%] h-72 overflow-y-auto py-6 px-2 mt-4">
        <ul className="flex flex-col items-center gap-2" data-testid="lap-list">
          {reversedLaps.map((lap, index) => {
            const hours = Math.floor(lap / 360000)
              .toString()
              .padStart(2, "0");
            const minutes = Math.floor((lap % 360000) / 6000)
              .toString()
              .padStart(2, "0");
            const seconds = Math.floor((lap % 6000) / 100)
              .toString()
              .padStart(2, "0");
            const milliseconds = (lap % 100).toString().padStart(2, "0");
            return (
              <li
                key={index}
                className="transition duration-75 ease-in hover:-translate-y-0.5 hover:scale-105 border-2 w-[80%] rounded-md py-2 px-4"
              >
                {/* Display the lap number */}
                <p className="text-xs text-slate-600">
                  Lap {reversedLaps.length - index}
                </p>
                {/* Display the lap time */}
                <p className="text-2xl">{`${hours}:${minutes}:${seconds}:${milliseconds}`}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
