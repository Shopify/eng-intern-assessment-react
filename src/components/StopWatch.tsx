import React, { useEffect, useRef } from 'react'
import '../styles/StopWatch.css';
import { useState } from 'react';
import StopWatchButton from './StopWatchButton';

export default function StopWatch() {

  const [time, setTime] = useState<number>(0);
  const [timeList, setTimeList] = useState<(number|string)[]>([]);
  const [isTimeRunning, setIsTimeRunning] = useState<boolean>(false);

  useEffect(() => {
    let tempTimeList: (number|string)[] = timeFormat(time);
    setTimeList(tempTimeList);
  }, [time]);

  const hour: number|string = timeList[0];
  const min: number|string = timeList[1];
  const sec: number|string = timeList[2];
  
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
    setIsTimeRunning(!isTimeRunning);
  }

  const runLap = () => {
   console.log('reset')
  }
  
  return(
    <>
      <div className='timer-container'>
        <div className='hour'>{hour}</div>
        <div className='min'>{min}</div>
        <div className='sec'>{sec}</div>
      </div>
      <div className='buttons-container'>
        <StopWatchButton onClick={runStartStop} label={isTimeRunning ? 'Stop' : 'Start'} />
        <StopWatchButton onClick={runReset} label={'Reset'}/>
        <StopWatchButton onClick={runLap} label={'Lap'}/>
      </div>
    </>
  );

}

const timeFormat = (time: number): (number|string)[] => {
  
  const hours:number = Math.floor(time / 3600);
  const minutes:number = Math.floor((time - (hours * 3600)) / 60);
  const seconds:number = time - (hours * 3600) - (minutes * 60);
  
  return [
      hours < 10 ? `0${hours}:` : hours,
      minutes < 10 ? `0${minutes}:` : minutes,
      seconds < 10 ? `0${seconds}` : seconds
  ];
}