import { useState, useRef } from 'react';

export const movement = () => {
  const [timeInSeconds, setTimeInSeconds] = useState<number>(0);

  const [timerOn, setTimerOn] = useState<boolean>(false);

  const handleMovement = () => {
    setTimeInSeconds((prevState: number) => prevState + 10);
  };

  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  const startMovement = () => {
    intervalIdRef.current = setInterval(handleMovement, 10);
  };

  const stopMovement = () => {
    if (intervalIdRef.current !== null) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
  };

  return {
    timeInSeconds,
    setTimeInSeconds,
    timerOn,
    setTimerOn,
    handleMovement,
    startMovement,
    stopMovement
  };
};