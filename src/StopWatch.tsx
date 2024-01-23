import React, { useState, useEffect, useRef } from 'react'
import calculateTime from './helpers/calculateTime'
import StopWatchButton from './StopWatchButton';

export default function StopWatch() {

  const [timeInSeconds, setTimeInSeconds] = useState<number>(0);
  const [timerOn, setTimerOn] = useState<boolean>(false);
  const [formattedTime, setFormattedTime] = useState({
    minutesFormatted: '00',
    secondsFormatted: '00',
    millisecondsFormatted: '00'
  });

  const intervalIdRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleMovement = () => {
      setTimeInSeconds((prevState: number) => prevState + 10);
    };

    const startMovement = () => {
      intervalIdRef.current = setInterval(handleMovement, 10);
    };

    const stopMovement = () => {
      if (intervalIdRef.current !== null) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }
    };

    if (timerOn) {
      startMovement();
    } else {
      stopMovement();
    }

    return () => {
      stopMovement();
    };
  }, [timerOn]);

  useEffect(() => {
    setFormattedTime(calculateTime(timeInSeconds));
  }, [timeInSeconds]);

    return(
      <main>
        <div className = "time-container" title="display">
          <p className='timer-text'>{formattedTime.minutesFormatted}</p>
          <span>:</span>
          <p className='timer-text'>{formattedTime.secondsFormatted}</p>
          <span>:</span>
          <p className='timer-text'>{formattedTime.millisecondsFormatted}</p>
        </div>
        <StopWatchButton 
          setTimeInSeconds={setTimeInSeconds} 
          timeInSeconds={timeInSeconds} 
          setTimerOn={setTimerOn}
        />
      </main>
    )
}