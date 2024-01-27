import React, { useEffect, useRef } from 'react'
import '../styles/StopWatch.css';
import { useState } from 'react';
import StopWatchButton from './StopWatchButton';

export default function StopWatch() {

  const [time, setTime] = useState<number>(0);
  const [timeList, setTimeList] = useState<(number|string)>(0);
  const [isTimeRunning, setIsTimeRunning] = useState<boolean>(false);
  const [lapsList, setLapsList] = useState<(number|string)[]>([]);

  useEffect(() => {
    let tempTime: (number|string) = timeFormat(time);
    setTimeList(tempTime);
  }, [time]);

  
  const [intervalID, setIntervalID] = useState<number>(0)

  const runStartStop = () => {
    if (!isTimeRunning) {
      let interval: any = setInterval(() => {
        setTime((prev: number) => prev + 1)
      }, 1000);

      setIntervalID(interval);
    
    } else {
      clearInterval(intervalID);
    }  

    setIsTimeRunning(!isTimeRunning);
  }

  const runReset = () => {
    clearInterval(intervalID);
    setTime(0);

    if (isTimeRunning) {
      setIsTimeRunning(!isTimeRunning);
    }

    setLapsList([]);
  }

  const runLap = () => {
   setLapsList(laps => [... laps, timeFormat(time)]);
  }
  
  return(
    <>
      <div className='timer-container'>
        <div>{timeList}</div>
      </div>

      <div className='buttons-container'>
        <StopWatchButton onClick={runStartStop} label={isTimeRunning ? 'Stop' : 'Start'} />
        <StopWatchButton onClick={runReset} label={'Reset'}/>
        <StopWatchButton onClick={runLap} label={'Lap'}/>
      </div>

      <div className='laps-container'>
        <div className='lapsTitle'>Laps</div>
          <ol className='lapsList'>
            {lapsList.map((lap) => (
              <li>{lap}</li>
            ))}
          </ol>
      </div>
    </>
  );

}

const timeFormat = (time: number): number|string => {
  
  let hours: number|string = Math.floor(time / 3600);
  let mins: number|string = Math.floor((time - (hours * 3600)) / 60);
  let secs: number|string = time - (hours * 3600) - (mins * 60);

  hours = hours < 10 ? `0${hours}` : hours;
  mins = mins < 10 ? `0${mins}` : mins;
  secs = secs < 10 ? `0${secs}` : secs;
  
  return `${hours}:${mins}:${secs}`;
}