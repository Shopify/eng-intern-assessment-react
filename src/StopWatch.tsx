import React, { useEffect, useRef } from 'react'
import calculateTime from './helpers/calculateTime'
import StopWatchButton from './StopWatchButton';
import { movement } from './helpers/movement';

export default function StopWatch() {
  const { 
    setTimeInSeconds,
    timeInSeconds,
    setTimerOn,
    timerOn,
    startMovement,
    stopMovement} = movement();

  useEffect(() => {

    if (timerOn) {
      startMovement();
    } else {
      stopMovement();
    }

    return () => {
      stopMovement();
    };
  }, [timerOn]);

    let formattedTime = calculateTime(timeInSeconds);

    return(
      <main>
        <div className = "time-container" title="display">
          <p className='timer-text' id='minutes'>{formattedTime.minutesFormatted}</p>
          <span>:</span>
          <p className='timer-text' id='seconds'>{formattedTime.secondsFormatted}</p>
          <span>:</span>
          <p className='timer-text' id='milliseconds'>{formattedTime.millisecondsFormatted}</p>
        </div>
        <StopWatchButton 
          setTimeInSeconds={setTimeInSeconds} 
          timeInSeconds={timeInSeconds} 
          setTimerOn={setTimerOn}
        />
      </main>
    )
}