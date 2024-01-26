import React, { useEffect, useRef, useState } from 'react'
import StopWatchButton from '../../Components/StopWatchButton/StopWatchButton'
import './StopWatch.css';
import type { RootState } from '../../app/store';
import { useSelector, useDispatch } from 'react-redux';
import { start, stop, reset, update, faceChange, lap } from './StopWatchSlice';
import Title from '../../Components/Title/Title';
import { formatTime } from '../../utils/formatTime';
import LapsTable from '../../Components/LapsTable/LapsTable';

// main StopWatch page
const StopWatch = () => {
  const timer = useSelector((state: RootState) => state.timer)
  const dispatch = useDispatch()

  // use intervals to update the watch time if timer is running
  useEffect(() => {
    if (timer.running) {
      const intervalId = setInterval(() => {
        dispatch(update());
      }, 10);

      return () => clearInterval(intervalId)
    }
  }, [timer, dispatch]);

  // rotation of the hands for the analog watch face
  const secRotation = {
    transform: `rotate(${Math.floor(timer.value / (1000)) % 60 * 6}deg)`,
  };

  const lapRotation = {
    transform: `rotate(${Math.floor(timer.laptime / (1000)) % 60 * 6}deg)`, 
  };

  return (
    <div className='container'>
      <Title/>
      <div className={`watch-face${timer.face}`}>
        {(timer.face === 2 ? // analog watch face
          (<><div className="sec_hand" style={secRotation} />
            <div className="lap_hand" style={lapRotation} />
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
            <div className="time-inside">{formatTime(timer.value)}</div>
          </>
          ) : (<div className="time">{formatTime(timer.value)}</div>))}

      </div>
      {
        // if watch is running, display Stop and Lap, else Start and Reset Buttons
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
      <LapsTable/>
    </div>
  );
}
export default StopWatch;



