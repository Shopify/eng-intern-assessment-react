import React, { useEffect, useRef, useState } from 'react'
import StopWatchButton from '../../Components/StopWatchButton/StopWatchButton'
import './StopWatch.css';
import type { RootState } from '../../app/store';
import { useSelector, useDispatch } from 'react-redux';
import { start, stop, reset, update, faceChange, lap } from './StopWatchSlice';
import { Button, List } from '@shopify/polaris';
import FaceSelector from '../../Components/StopWatchButton/FaceSelector';

const StopWatch = () => {
  const timer = useSelector((state: RootState) => state.timer)
  const dispatch = useDispatch()

  useEffect(() => {
    if (timer.running) {
      const intervalId = setInterval(() => {
        dispatch(update());
      }, 10);

      return () => clearInterval(intervalId)
    }
    else {
      return;
    }
  }, [timer, dispatch]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / (60 * 1000)) % 60;
    const seconds = Math.floor(time / (1000)) % 60;
    const milliseconds = Math.floor(time) % 1000;

    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    const formattedmilliseconds = milliseconds < 100 ? milliseconds < 10 ? `00${milliseconds}` : `0${milliseconds}` : milliseconds;

    return `${formattedMinutes}:${formattedSeconds}:${formattedmilliseconds}`;
  };

  const secRotation = {
    transform: `rotate(${Math.floor(timer.value / (1000)) % 60 * 6}deg)`, // 6 degrees per second (360 degrees / 60 seconds)
  };

  const minRotation = {
    transform: `rotate(${Math.floor(timer.value / (1000 * 60)) % 60 * 6}deg)`, // 6 degrees per second (360 degrees / 60 seconds)
  };

  const laps = timer.laps.map((lap) => {
    return <List.Item key={lap} >{formatTime(lap)}</List.Item>;
  })

  return (
    <div className='container'>
      <div className={`watch-face${timer.face}`}>
        {(timer.face === 0 ?
          (<><div className="sec_hand" style={secRotation} />
            <div className="min_hand" style={minRotation} />
            <span className="twelve">12</span>
            <span className="one">1</span>
            <span className="two">2</span>
            <span className="three">3</span>
            <span className="four">4</span>
            <span className="five">5</span>
            <span className="six">6</span>
            <span className="seven">7</span>
            <span className="eight">8</span>
            <span className="nine">9</span>
            <span className="ten">10</span>
            <span className="eleven">11</span>
          </>
          ) : (<div className="time">{formatTime(timer.value)}</div>))}

      </div>
      {
        (timer.running ?
          (<div className='buttons'>
            <StopWatchButton buttonType='Stop' onClick={() => dispatch(stop())}></StopWatchButton>
            <StopWatchButton buttonType='Lap' onClick={() => dispatch(lap())}></StopWatchButton>

          </div>) :
          (<div className='buttons'>
            <StopWatchButton buttonType='Start' onClick={() => dispatch(start())}></StopWatchButton>
            <StopWatchButton buttonType='Reset' onClick={() => dispatch(reset())}></StopWatchButton>
          </div>)
        )}

      <StopWatchButton buttonType='Change Watch Face' onClick={() => dispatch(faceChange())}></StopWatchButton>


      {/* <div className="analog-stopwatch">
      <div className="hand" style={transformStyle}></div>
    </div> */}
      <div>
        <List type="bullet">
          {laps}
        </List>
      </div>
    </div>

  );
}
export default StopWatch;



