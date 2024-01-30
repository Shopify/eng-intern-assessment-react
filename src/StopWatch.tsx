import React, { useEffect, useState } from "react";
import { msToTimeString } from "../utils/msToTimeString";
import { HiOutlineSun, HiMoon } from "react-icons/hi2";
import StopWatchButton from "./StopWatchButton";
import "./index.css";

export default function StopWatch() {
  // variables to keep track of time, system mode, timer state, and laps
  const [curTime, setCurTime] = useState(0);
  const [isDark, setIsDark] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const [lastLap, setLastLap] = useState(0);

  // this function starts the timer
  const Start = () => {
    setIsRunning(true);
  };

  // this function stops the timer
  const Stop = () => {
    setIsRunning(false);
  };

  // this function resets the timer
  const Reset = () => {
    setCurTime(0);
    setIsRunning(false);
    setLaps([]);
    setLastLap(0);
  };

  // this function adds a lap to the array of laps
  const Lap = () => {
    const lap = curTime - lastLap;
    setLaps((prev) => [lap, ...prev]);
    setLastLap(curTime);
  };

  // this function changes the system theme
  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  useEffect(() => {
    let interval: number | NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setCurTime((lastlap) => lastlap + 10);
      }, 10);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  return (
    <div
      className={`${
        isDark ? "bg-[#181818]" : "bg-[#E9E9E9]"
      } h-screen w-screen flex flex-col`}
    >
      <button
        onClick={toggleTheme}
        className={`${
          isDark
            ? "text-[#E9E9E9] opacity-60 hover:opacity-100"
            : "text-[#181818] opacity-60 hover:opacity-100"
        } bg-transparent font-semibold py-4 px-4`}
      >
        {isDark ? <HiOutlineSun size={40} /> : <HiMoon size={40} />}
      </button>
      <h1
        className={`${
          isDark ? "text-[#E9E9E9]" : "text-[#181818]"
        } text-center font-thin text-8xl mx-auto`}
      >
        {msToTimeString(curTime)}
      </h1>
      <div className="flex gap-4 flex-row justify-center py-4">
        <StopWatchButton
          type={!isRunning ? "start" : "stop"}
          onClick={!isRunning ? Start : Stop}
          isDark={isDark}
        />
        <StopWatchButton type="reset" onClick={Reset} isDark={isDark} />
        <StopWatchButton
          type="lap"
          onClick={Lap}
          disable={!isRunning && curTime == 0}
          isDark={isDark}
        />
      </div>
      <div
        className={`${
          isDark
            ? "text-[#E9E9E9] border-t-[#E9E9E9] border-opacity-70"
            : "text-[#181818] border-t-[#181818] border-opacity-70"
        }  my-5 border-t-[1.5px] w-3/4 h-1/2 font-light mx-auto overflow-y-scroll`}
      >
        <ul>
          {laps.map((lap, i) => {
            return (
              <li
                key={i}
                className={`border-b-[1.5px] opacity-70 ${
                  isDark ? "border-b-[#E9E9E9]" : "border-b-[#181818]"
                }`}
              >
                <div className="flex flex-row py-2">
                  <p className="flex ml-0 mr-auto">{`Lap ${
                    laps.length - i
                  }`}</p>
                  <p className="flex mr-0 ml-auto">{msToTimeString(lap)}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
