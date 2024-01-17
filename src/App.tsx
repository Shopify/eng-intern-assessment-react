import React from 'react'
import StopWatchButton from './StopWatchButton'
import { useEffect, useState } from 'react';
import StopWatch from './StopWatch';
import './styles/App.css'

interface LapTrackerComponentsProps{
    lapTimes: string[]
}

// Component to render the lap time record
export const LapTrackerComponents:React.FC<LapTrackerComponentsProps> = ({lapTimes}) => {
  return (
    <div className="lapTimesBox">
        <hr/>
        <h3>Laps Tracker</h3>
        <h5>Format: (HH:MM:SS:MM)</h5>
        {
            lapTimes.map((lapTime, index) => {
                return <div className="lapTimeFlex" key={index} data-testid={`laptimeItem-${index}`}>
                    <span className="lapTimeTag">Lap {lapTimes.length - index}: </span><span>{lapTime}</span>
                </div>
            })
        }
    </div>
  )
};

// Convert milliseconds into format HH:MM:SS:MM
export function formatTimeValue(milliseconds: number): string {
    // Calculate hours, minutes, seconds, and remaining milliseconds
    const hours = Math.floor(milliseconds / (60 * 60 * 100));
    const minutes = Math.floor((milliseconds % (60 * 60 * 100)) / (60 * 100));
    const seconds = Math.floor((milliseconds % (60 * 100)) / 100);
    const remainingMilliseconds = milliseconds % 100;
    return `${handleTimeDigits(hours)}:${handleTimeDigits(minutes)}:${handleTimeDigits(seconds)}:${handleTimeDigits(remainingMilliseconds)}`;
    }
    
// Helper function to pad numbers with leading zeros
export function handleTimeDigits(num: number): string {
    const numString = num.toString();
    return numString.length >= 2 ? numString : new Array(2 - numString.length + 1).join('0') + numString;
}

export default function App() {
    // Main timer
    const [timer, setTimer] = useState<number>(0);

    // Hook to control the timer
    const [running, setRunning] = useState<boolean>(false);

    // Variable to store lap time records
    const [lapTimes, setLapTimes] = useState<string[]>([]);

    // Function to record lap time
    const RecordLapTime = () => {
        setLapTimes((prevLapTimes) => [formatTimeValue(timer), ...prevLapTimes]);
    };

    // Function to reset the timer and lap tracked when called.
    const ResetTimer = () => {
        setTimer(0);
        setLapTimes([]);
        setRunning(false);
    }

    // Interval computation to update timer
    useEffect(() => {
        let intervalId: NodeJS.Timeout
        // Update the timer count only when running is enabled i.e. is set to true
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
            {(lapTimes.length > 0)?<LapTrackerComponents lapTimes={lapTimes}/>:''}
        </div>
    )
}