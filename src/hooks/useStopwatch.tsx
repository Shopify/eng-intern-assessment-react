import { useState, useRef, useCallback, useEffect } from "react";

export default function useStopwatch() {
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [startTime, setStartTime] = useState(0);
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
  }, []);

  useEffect(() => {
    return () => clearInterval(countRef.current);
  }, []);

  return { timer, startTime, start, stop, reset, isActive };
}
