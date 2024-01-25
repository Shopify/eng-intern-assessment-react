import React, { useEffect } from 'react'
import { movement } from '../helpers/movement';
import StopWatchButtons from './Controls';
import Display from './Display';

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

    return(
      <main>
        <Display timeInSeconds={timeInSeconds}/>
        <StopWatchButtons 
          setTimeInSeconds={setTimeInSeconds} 
          timeInSeconds={timeInSeconds} 
          setTimerOn={setTimerOn}
        />
      </main>
    )
}