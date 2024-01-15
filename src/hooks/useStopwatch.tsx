import { useEffect, useRef, useState } from "react";
import { formatNum, getCurrentTime } from "../utils/utils";

export default function useStopwatch() {
  // current timer value in seconds
  const [timer, setTimer] = useState(0);
  // used to check if timer is running or not
  const [isActive, setIsActive] = useState(false);
  // list of lap times
  const [laps, setLaps] = useState<string[]>([]);
  // used to clear interval when timer is stopped
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
    // is active means timer is running
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
