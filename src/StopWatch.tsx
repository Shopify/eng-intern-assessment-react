import React, { useState, useEffect } from 'react'
import calculateTime from './helpers/calculateTime'
import StopWatchButton from './StopWatchButton';

export default function StopWatch() {
  const [timeInSeconds, setTimeInSeconds] = useState<number>(0);
  const [timerArray, setTimerArray] = useState<Array<number|string>>([]);

  //Whenever timeInSeconds changes, set timerArray to timeArray.
  useEffect(() => {
    let timeArray: Array<number|string> = calculateTime(timeInSeconds);
    setTimerArray(timeArray);
  }, [timeInSeconds])

    return(
      <main>
        <div className = "time-container" title="display">
          <p className='timer-text'>{timerArray[0]}</p>
          <span>:</span>
          <p className='timer-text'>{timerArray[1]}</p>
          <span>:</span>
          <p className='timer-text'>{timerArray[2]}</p>
        </div>
        <StopWatchButton setTimeInSeconds={setTimeInSeconds} timeInSeconds={timeInSeconds}/>
      </main>
    )
}