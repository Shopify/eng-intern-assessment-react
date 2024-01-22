import React, { useEffect, useRef, useState } from 'react'
import StopWatchButton from '../../Components/StopWatchButton/StopWatchButton'
import './StopWatch.css';
import type { RootState } from '../../app/store';
import { useSelector, useDispatch } from 'react-redux';
import {start, stop, reset, update, faceChange} from './StopWatchSlice';

const StopWatch = () => {
  const timer = useSelector((state: RootState) => state.timer)
  const dispatch = useDispatch()

  useEffect(() => {
    if(timer.running){
      const intervalId = setInterval(() => {
      dispatch(update());
    }, 10);

    return () => clearInterval(intervalId)}
  }, [timer, dispatch]);

  const formatTime = (time: number) => {
    const hours = Math.floor(time / (3600*1000)) % 24;
    const minutes = Math.floor(time / (60*1000)) % 60;
    const seconds = Math.floor(time / (1000)) % 60;
    const milliseconds = Math.floor(time) % 1000;

    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    const formattedmilliseconds = milliseconds < 100 ? milliseconds<10?`00${milliseconds}` : `0${milliseconds}`:milliseconds;

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}:${formattedmilliseconds}`;
  };

 
  return (
    <div className='container'>
        <div className={`watch-face${timer.face}`}>
          <div className="time">{formatTime(timer.value)}</div>
          <div className="buttons">
              <StopWatchButton buttonType='Start' onClick={()=>dispatch(start())}></StopWatchButton>
              <StopWatchButton buttonType='Stop' onClick={()=>dispatch(stop())}></StopWatchButton>
              <StopWatchButton buttonType='Reset' onClick={()=>dispatch(reset())}></StopWatchButton>
              <StopWatchButton buttonType='Change' onClick={()=>dispatch(faceChange())}></StopWatchButton>
          </div>
        </div>
        
    </div>
  );
}
export default StopWatch;



