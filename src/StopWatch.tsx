import React, { useState, useEffect, useCallback } from 'react';
import StopWatchButton from './StopWatchButton';

// Utility function to format time in mm:ss:ms format
export function formatTime(time: number): string {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    // Construct the formatted time string, including hours if necessary
    return [
        hours ? String(hours).padStart(2, '0') + ':' : '',
        String(minutes).padStart(2, '0') + ':',
        String(seconds).padStart(2, '0') + '.',
        String(milliseconds).padStart(2, '0')
    ].join('');
}

const StopWatch: React.FC = () => {
    // State hooks for time, timer status, and recorded lap times
    const [time, setTime] = useState<number>(0);
    const [timerOn, setTimerOn] = useState<boolean>(false);
    const [lapTimes, setLapTimes] = useState<number[]>([]);

    // Effect hook to handle the stopwatch timing functionality
    useEffect(() => {
        let interval: ReturnType<typeof setInterval> | null = null;
        if (timerOn) {
            interval = setInterval(() => setTime(prevTime => prevTime + 10), 10); // Update time every 10ms
        }
        return () => interval && clearInterval(interval); // Cleanup interval on component unmount or timerOn change
    }, [timerOn]);

    // Callbacks for start, stop, reset, and record lap functionalities
    const handleReset = useCallback(() => {
        setTimerOn(false);
        setTime(0);
        setLapTimes([]);
    }, []);

    return (
        <div className='stopwatch'>
            <h1 className='stopwatch-title'>StopWatch</h1>
            <div className='stopwatch-time'>{formatTime(time)}</div>
            <div className='stopwatch-buttons'>
                {/* Button components for controlling the stopwatch */}
                <StopWatchButton type='start' onClick={() => setTimerOn(true)} disabled={timerOn} />
                <StopWatchButton type='stop' onClick={() => setTimerOn(false)} disabled={!timerOn} />
                <StopWatchButton type='lap' onClick={() => setLapTimes([...lapTimes, time])} disabled={!timerOn || lapTimes.length >= 25} />
                <StopWatchButton type='reset' onClick={handleReset} disabled={!timerOn && time === 0} />
            </div>
            {/* Display recorded lap times, if any */}
            {lapTimes.length > 0 && (
                <ul className='stopwatch-laptimes'>
                    {lapTimes.map((lapTime, index) => (
                        <li key={index}>Lap {index + 1}: {formatTime(lapTime)}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default StopWatch;
