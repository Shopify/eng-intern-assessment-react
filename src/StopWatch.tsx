import React, { useEffect, useState } from "react";
import StopWatchButton from "./StopWatchButton";

export default function StopWatch() {
  // state to keep track of the time
  const [time, setTime] = useState(0);

  // state to keep track of whether the stopwatch is running or not
  const [isRunning, setIsRunning] = useState(false);

  // state to keep track of the laps
  const [laps, setLaps] = useState<number[]>([]);

  // useEffect runs every time isRunning or time changes
  useEffect(() => {
    if (isRunning) {
      // increments time by 1 every 10 milliseconds
      const interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 10);
      return () => clearInterval(interval);
    }
  }, [isRunning, time]);

  // converts time to hours, minutes, seconds, and milliseconds
  const hours = Math.floor(time / 360000);
  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const milliseconds = time % 100;

  const reversedLaps = laps.slice().reverse();

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex gap-2 items-end">
        <div className="border-2 text-3xl w-28 h-28 flex flex-col justify-center items-center rounded-md">
          <div>{hours.toString().padStart(2, "0")}</div>
          <p className="text-sm">hr</p>
        </div>
        <div className="border-2 text-3xl w-28 h-28 flex flex-col justify-center items-center rounded-md">
          <div>{minutes.toString().padStart(2, "0")}</div>
          <p className="text-sm">min</p>
        </div>
        <div className="border-2 text-3xl w-28 h-28 flex flex-col justify-center items-center rounded-md">
          <div>{seconds.toString().padStart(2, "0")}</div>
          <p className="text-sm">sec</p>
        </div>
        <div className="border-2 text-xl w-20 h-20 flex flex-col justify-center items-center rounded-md">
          <div>{milliseconds.toString().padStart(2, "0")}</div>
          <p className="text-sm">ms</p>
        </div>
      </div>
      <StopWatchButton
        isRunning={isRunning}
        setIsRunning={setIsRunning}
        setTime={setTime}
        setLaps={setLaps}
        time={time}
      />
      <div className="w-[40%] h-72 overflow-y-auto py-6 px-2">
        <ul className="flex flex-col items-center gap-2">
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
              <li key={index} className="border-2 w-full rounded-md py-2 px-4">
                <p className="text-xs text-slate-500">
                  Lap {reversedLaps.length - index}
                </p>
                <p>{`${hours}:${minutes}:${seconds}:${milliseconds}`}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
