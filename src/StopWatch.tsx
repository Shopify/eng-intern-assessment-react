import React, { useEffect, useState } from 'react'
import StopWatchButton from './StopWatchButton';

export default function StopWatch() {

    const [time, setTime] = useState<number>(0);
    const [timerOn, setTimerOn] = useState<Boolean>(false);
    const [laps, setlaps] = useState<number[]>([]);


    useEffect(() => {

        let interval: any = null;

        if(timerOn) {
            interval = setInterval(() => {
                setTime(prevtime => prevtime + 10)
            }, 10)
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval)
        },[timerOn]) 


     //handle play/pause button
     const handelPlayPause = () => {
        setTimerOn(!timerOn);
     };

     //handle stop and add laps
     const handleStop = () => {
        if (timerOn) {
            setlaps([...laps, time]);
            setTimerOn(false);
        }
     }

     //handle reset button
     const handelReset = () => {
        setTime(0);
        setlaps([]); 
        setTimerOn(false);

     }


// creating the digit runs mm:ss:msms
    const formatTime = (): string => { 

    let minutes: string = Math.floor(time/ 60000).toString().padStart(2,'0'); // padstart - string has 2 characters, padding with 0 if necessary
    let seconds: string = Math.floor(time/ 1000).toString().padStart(2,'0');
    let milliseconds: string = Math.floor((time/10)%100).toString().padStart(2,'0');

    return `${minutes}:${seconds}:${milliseconds}`;
    }

    return(

        <div className='timer-container'>
            {formatTime()}
            <StopWatchButton label={timerOn ? "Pause" : "Start"} onClick={handelPlayPause} />
            <StopWatchButton label="Stop" onClick={handleStop} />
            <StopWatchButton label="Reset" onClick={handelReset} />
            
        </div>
    )
}