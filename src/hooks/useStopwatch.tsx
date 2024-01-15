import { useState, useRef, useCallback, useEffect } from "react";

export default function useStopwatch() {
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [laps, setLaps] = useState<string[]>([]);
  const countRef = useRef(null);

  const start = useCallback(() => {
    setIsActive(true);
    setStartTime(Date.now());
    countRef.current = setInterval(() => {
      setTimer(Date.now());
    }, 1);
  }, [timer, startTime]);

  const stop = useCallback(() => {
    clearInterval(countRef.current);
    setIsActive(false);
  }, []);

  const reset = useCallback(() => {
    clearInterval(countRef.current);
    setIsActive(false);
    setTimer(0);
    setStartTime(0);
    setLaps([]);
  }, []);

  const lap = useCallback(() => {
    const lapTime = getCurrentTimeFormatted();
    setLaps((prevLaps) => [...prevLaps, lapTime]);
  }, [timer, startTime]);

  const getCurrentTime = () => {
    const totalSeconds = Math.floor((timer - startTime) / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = timer - startTime - totalSeconds * 1000;

    return {
      hours,
      minutes,
      seconds,
      milliseconds,
    };
  };

  const formatNum = (num: number) => ("0" + num).slice(-2);
  const getCurrentTimeFormatted = useCallback(() => {
    const currentTime = getCurrentTime();
    return `
    ${formatNum(currentTime.hours)}:
    ${formatNum(currentTime.minutes)}:
    ${formatNum(currentTime.seconds)}:
    ${formatNum(currentTime.milliseconds)}
    `;
  }, [timer, startTime]);

  useEffect(() => {
    return () => clearInterval(countRef.current);
  }, []);

  return {
    timer,
    startTime,
    laps,
    isActive,
    lap,
    start,
    stop,
    reset,
  };
}
