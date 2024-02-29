import React from 'react'
import './StopWatch.css';
import StopWatchButton from './StopWatchButton';

// Components stopwatch should have 
interface StopWatch {
    time: number; // time in milliseconds
    laps: number[]; // array of lap times in milliseconds
    isRunning: boolean; // flag to show if the timer is running or not
    onStartStop: () => void; // starts/stops stopwatch
    onLap: () => void; // records a lap time
    onReset: () => void; // resets the stopwatch
}
// function to convert milliseconds to seconds and minutes 
const formatTime = (milliseconds: number): string => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const remainingMilliseconds = milliseconds % 1000;
    
    // converts milliseconds to proper format
    const formattedMilliseconds = String(remainingMilliseconds).padStart(3, '0').slice(0, 2);
  
    return (
      String(minutes).padStart(2, '0') + ':' +
      String(remainingSeconds).padStart(2, '0') + '.' +
      formattedMilliseconds
    );
  };
  
// Functional component for StopWatch component
const StopWatch: React.FC<StopWatch> = ({ time, laps, isRunning, onStartStop, onLap, onReset}) => (
    <div className='stopwatch'>
        <p className='stopwatch-time'>{formatTime(time)}</p>
        <ul className='stopwatch-laps'>
            {laps.map((lapTime, index) => (
                <li key={index} className="lap-item">
                    {formatTime(lapTime)}
                </li>
            ))}
        </ul>
        <StopWatchButton
            isRunning={isRunning}
            onStartStop={onStartStop}
            onLap={onLap}
            onReset={onReset} 
           />
    </div>
)
export default StopWatch;
