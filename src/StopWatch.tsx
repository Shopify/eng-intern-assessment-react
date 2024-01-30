import React, { useEffect, useState } from "react";
import { msToTimeString } from "../utils/msToTimeString";
import { HiOutlineSun, HiMoon } from "react-icons/hi2";
import StopWatchButton from "./StopWatchButton";
import "./index.css";

export default function StopWatch() {
  const [curTime, setCurTime] = useState(0);
  const [isDark, setIsDark] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const [lastLap, setLastLap] = useState(0);

  const Start = () => {
    setIsRunning(true);
  };

  const Stop = () => {
    setIsRunning(false);
  };

  const Reset = () => {
    setCurTime(0);
    setIsRunning(false);
    setLaps([]);
    setLastLap(0);
  };

  const Lap = () => {
    const lap = curTime - lastLap;
    setLaps((prev) => [lap, ...prev]);
    setLastLap(curTime);
  };

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
      className={`${isDark ? "bg-[#202123]" : "bg-[#E9E9E9]"} h-screen w-screen`}
    >
      <button
        onClick={toggleTheme}
        className={`${isDark ? "text-[#E9E9E9] opacity-60 hover:opacity-100" : "text-[#202123] opacity-60 hover:opacity-100" } bg-transparent font-semibold py-4 px-4`}
      >
        {isDark ? <HiOutlineSun size={40} /> : <HiMoon size={40} />}
      </button>
      <h1 className={`${isDark ? "text-[#E9E9E9]" : "text-[#202123]"} text-center font-thin text-8xl w-1/2 mx-auto`}>
        {msToTimeString(curTime)}
      </h1>
      <div className="flex gap-4 flex-row justify-center py-4" >
        <StopWatchButton type={!isRunning? 'start' : 'stop'} onClick={!isRunning ? Start : Stop} isDark={isDark}/>
        <StopWatchButton type="reset" onClick={Reset} isDark={isDark}/>
        <StopWatchButton type="lap" onClick={Lap} disable={!isRunning && curTime == 0} isDark={isDark}/>
      </div>
      <div className={`${isDark ? "text-[#E9E9E9] border-t-[#E9E9E9]" : "text-[#202123] border-t-[#202123]"} my-5 border-t-[1.5px] w-3/4 h-1/2 font-light mx-auto overflow-y-scroll`}>
        <ul>
            {laps.map((lap, i) => {
            return (
            <li key={i} className={`border-b-[1.5px] ${isDark ? "border-b-[#E9E9E9]" : "border-b-[#202123]"}`}>
                <div className="flex flex-row py-2">
                    <p className="flex ml-0 mr-auto">{`Lap ${laps.length - i}`}</p>
                    <p className="flex mr-0 ml-auto">{msToTimeString(lap)}</p>
                </div>
            </li> )
            })}
        </ul>
      </div>
    </div>
  );
}
