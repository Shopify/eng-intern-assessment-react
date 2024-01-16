import React from 'react'
import StopWatchButton from './StopWatchButton'
import { useEffect, useState } from 'react';
import StopWatch from './StopWatch';
import './styles/App.css'
import { format } from 'path';

export default function App() {
    const [running, setRunning] = useState<boolean>(false);
    const [lapTimes, setLapTimes] = useState<string[]>([]);
    const [timer, setTimer] = useState<number>(0);

    const RecordLapTime = () => {
        setLapTimes((prevLapTimes) => [formatTimeValue(timer), ...prevLapTimes]);
    };

    const ResetTimer = () => {
        setTimer(0);
        setLapTimes([]);
        setRunning(false);
    }

    function formatTimeValue(milliseconds: number): string {
        // Calculate hours, minutes, seconds, and remaining milliseconds
        const hours = Math.floor(milliseconds / (60 * 60 * 100));
        const minutes = Math.floor((milliseconds % (60 * 60 * 100)) / (60 * 100));
        const seconds = Math.floor((milliseconds % (60 * 100)) / 100);
        const remainingMilliseconds = milliseconds % 100;
      
        // Format the result as HH:MM:SS:MMM
        const formattedString = `${handleTimeDigits(hours)}:${handleTimeDigits(minutes)}:${handleTimeDigits(seconds)}:${handleTimeDigits(remainingMilliseconds)}`;
        return formattedString;
      }
      
      // Helper function to pad numbers with leading zeros
      function handleTimeDigits(num: number, width: number = 2): string {
        const numString = num.toString();
        return numString.length >= width ? numString : new Array(width - numString.length + 1).join('0') + numString;
      }

    useEffect(() => {
        let intervalId: NodeJS.Timeout
        if (running) {
            intervalId = setInterval(() => {
                setTimer((prevTimer) => prevTimer + 1);
            }, 10);
        }
        return () => clearInterval(intervalId);
    }, [running]);

    return(
        <div className="stopWatchAppContainer">
            <div className='projectTitle'>
                <h2>Stopwatch</h2>
            </div>
            <StopWatch timeString={formatTimeValue(timer)}/>
            <StopWatchButton running={running} recordLapTime={RecordLapTime} setRunning={setRunning} resetTimer={ResetTimer} timer={timer}/>
            {
                (lapTimes.length > 0)
                ?<div className="lapTimesBox">
                    <hr/>
                    <h3>Laps Tracker</h3>
                    {
                        lapTimes.map((lapTime, index) => {
                            return <div className="lapTimeFlex">
                                <span className="lapTimeTag">Lap {lapTimes.length - index}: </span><span>{lapTime}</span>
                            </div>
                        })
                    }
                </div>
                :''
            }
        </div>
    )
}