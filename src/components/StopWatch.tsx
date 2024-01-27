import React, { useEffect, useRef } from 'react'
import '../styles/StopWatch.css';
import { useState } from 'react';
import StopWatchButton from './StopWatchButton';

export default function StopWatch() {

  const [time, setTime] = useState<number>(0);
  const [timeList, setTimeList] = useState<(number|string)[]>([]);

  useEffect(() => {
    
    let tempTimeList: (number|string)[] = timeFormat(time);
    setTimeList(tempTimeList);
  }, [time]);

  const hour: number|string = timeList[0];
  const min: number|string = timeList[1];
  const sec: number|string = timeList[2];

  return(
    <>
      <div className='timer-container'>
        <div className='hour'>{hour}</div>
        <div className='min'>{min}</div>
        <div className='sec'>{sec}</div>
      </div>
      <div className='buttons-container'>
        <StopWatchButton label={'Play'}/>
        <StopWatchButton label={'Stop'}/>
        <StopWatchButton label={'Reset'}/>
      </div>
    </>
  );

}

const timeFormat = (time: number): (number|string)[] => {
  
  const hours: number = Math.floor(time / 3600);
  const mins: number = Math.floor(time - (hours * 3600) / 60);
  const secs: number = Math.floor(time - (hours * 3600)- (mins * 60));

  const hourFormat: number|string = hours < 10 ? `0${hours}:` : hours;
  const minsFormat: number|string = hours < 10 ? `0${mins}:` : mins;
  const secsFormat: number|string = hours < 10 ? `0${secs}` : secs;

  return [hourFormat, minsFormat, secsFormat];
}