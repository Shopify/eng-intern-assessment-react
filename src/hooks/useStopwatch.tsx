import { useState, useRef, useCallback, useEffect } from "react";
import { formatNum, getCurrentTime } from "../utils/utils";
import { format } from "path";

export default function useStopwatch() {
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [laps, setLaps] = useState<string[]>([]);
  const countRef = useRef(null);

  const start = () => {
    setIsActive(true);
  };

  const stop = () => {
    setIsActive(false);
  };

  const reset = () => {
    clearInterval(countRef.current);
    setIsActive(false);
    setTimer(0);
    setLaps([]);
  };

  const lap = () => {
    const currentTime = getCurrentTime(timer);
    const lapTime = `${formatNum(currentTime.hours)}:
    ${formatNum(currentTime.minutes)}:
    ${formatNum(currentTime.seconds)}`;

    setLaps((prevLaps) => [...prevLaps, lapTime]);
  };

  useEffect(() => {
    return () => clearInterval(countRef.current);
  }, []);

  useEffect(() => {
    if (isActive) {
      // every 1sec, add 1 to timer
      countRef.current = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }

    return () => clearInterval(countRef.current);
  }, [isActive]);

  return {
    timer,
    laps,
    isActive,
    lap,
    start,
    stop,
    reset,
  };
}
