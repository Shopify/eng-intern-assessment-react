import React, { useState, useEffect, useCallback } from 'react'
import StopWatchButton from './StopWatchButton'

export function timeCalulator(timeInSeconds: number): Array<number|string> {
    let hours: number = Math.floor(timeInSeconds / 3600);
    let minutes: number = Math.floor((timeInSeconds - (hours * 3600)) / 60);
    let seconds: number = timeInSeconds - (hours * 3600) - (minutes * 60);
    let milliseconds: number = Math.round((timeInSeconds - Math.floor(timeInSeconds)) * 1000);

    let hoursFormatted = hours < 10?  `0${hours}` : hours;
    let minutesFormatted = minutes < 10?  `0${minutes}` : minutes;
    let secondsFormatted = seconds < 10?  `0${seconds}` : seconds;
    let millisecondsFormatted = milliseconds < 10? `0${milliseconds}` : milliseconds;


    return [hoursFormatted, minutesFormatted, secondsFormatted, millisecondsFormatted]

}



export default function StopWatch() {
    const[timeInSeconds, setTimeInSections]=useState(0);
    const[timerArray, setTimerArray]=useState<Array<number|string>>([]);

    useEffect(() => {
        let timeArray: Array<number|string> =timeCalulator(timeInSeconds);
        setTimerArray(timeArray);
    },[timeInSeconds]);

    return(
       <div>
       <div className='stopwatch-container'>
        <p className='timer-text'>{timerArray[0]}</p>
        <span>:</span>
        <p className='timer-text'>{timerArray[1]}</p>
        <span>:</span>
        <p className='timer-text'>{timerArray[2]}</p>
        <span>:</span>
        <p className='timer-text'>{timerArray[3]}</p> 
       </div>
       <div>
        <StopWatchButton></StopWatchButton>
       </div>
       </div>
       
       
    )
}