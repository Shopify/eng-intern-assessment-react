import React, { useState, useEffect } from 'react'
import calculateTime from './helpers/calculateTime'

export default function StopWatch() {
  const [timeInSeconds, setTimeInSeconds] = useState<number>(0);
  const [timerArray, setTimerArray] = useState<Array<number>>([]);

  useEffect(() => {
    let timeArray: Array<number> = calculateTime(timeInSeconds);
    setTimerArray(timeArray);
  }, [timeInSeconds])

    return(
        <div className = "time-container">
          <p className='timer-text'>{timerArray[0]}</p>
          <span>:</span>
          <p className='timer-text'>{timerArray[1]}</p>
          <span>:</span>
          <p className='timer-text'>{timerArray[2]}</p>
        </div>
    )
}