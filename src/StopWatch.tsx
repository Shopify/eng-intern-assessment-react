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


     //handle start/stop button
     const handelPlayPause = () => {
        setTimerOn(!timerOn);
     };

     //handle laps
     const handleLap = () => {
        if (timerOn) {
            //set static lap
            setlaps(prevLaps =>[...laps, time]);
            
        }
     }

     //handle reset button
     const handelReset = () => {
        setTime(0);
        setlaps([]); 
        setTimerOn(false);

     }


// creating the digit runs mm:ss:msms
        const formatTime = (timeToFormat: number): string => {
            let minutes: string = Math.floor(timeToFormat / 60000).toString().padStart(2, '0');
            let seconds: string = Math.floor((timeToFormat / 1000) % 60).toString().padStart(2, '0');
            let milliseconds: string = Math.floor((timeToFormat / 10) % 100).toString().padStart(2, '0');

            return `${minutes}:${seconds}:${milliseconds}`;
        };

    return(
        <main>
            <div className='timer-display'>{formatTime(time)}</div>
            <div className='btn-container'>
            <StopWatchButton label={timerOn ? "Stop" : "Start"} onClick={handelPlayPause} />
            <StopWatchButton label="Lap" onClick={handleLap} />
            <StopWatchButton label="Reset" onClick={handelReset} />
            </div>                      
                <div className="laps" data-testid="lap-list">
                {laps.map((lap, index) => (
                    <p key={index}>Lap {index + 1}: {formatTime(lap)}</p>
                    ))}
                 </div>
                 </main>
    )
}