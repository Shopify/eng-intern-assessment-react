import React, { useCallback } from 'react'
import './StopWatch.css'
import StopWatchButton from '../StopWatchButton/StopWatchButton'
import getFormattedTime from '../../utils/time-formatter'

export default function StopWatch() {

   const [time, setTime] = React.useState(0)
   const [isRunning, setIsRunning] = React.useState(false)
   const [laps, setLaps] = React.useState([]);

   const {hours, minutes, seconds, milliseconds} = getFormattedTime(time);

   const resetTimer = useCallback(() => {
      setTime(0)
      setIsRunning(false)
      setLaps([])
   }, []);

   const startTimer = useCallback(() => {
      setIsRunning(true);
   }, []);

   const stopTimer = useCallback(() => {
      setIsRunning(false);
   }, []);

   const addLap = useCallback(() => {
      setLaps((prevLaps) => [...prevLaps, time]);
   }, [time]);

    return(
        <div className='stopwatch'>
            <div className='time'>
               <p className='hour'>00</p>
               <p>:</p>
               <p className='seconds'>00</p>
               <p>.</p>
               <p className='milliseconds'>00</p>
            </div>
            <div className='buttons'>
               <StopWatchButton type='start'onClick={startTimer}/>
               <StopWatchButton type='stop'onClick={stopTimer}/>
               <StopWatchButton type='lap'onClick={addLap}/>
               <StopWatchButton type='reset'onClick={resetTimer}/>
            </div>
        </div>
    )
}