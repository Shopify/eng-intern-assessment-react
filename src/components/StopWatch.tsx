import React, { useState, useEffect } from 'react';
import StopWatchButton from './StopWatchButton';

// Effect hook to set up the interval when the stopwatch is running
const StopWatch = () => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [laps, setLaps] = useState<number[]>([]); // Store individual lap times
    const [cumulativeLaps, setCumulativeLaps] = useState<number[]>([]); // Store cumulative times

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (isRunning) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 100);
            }, 100);
        } else if (!isRunning && interval) {
            clearInterval(interval);
        }

        return () => interval && clearInterval(interval);
    }, [isRunning]);

    const handleStartStop = () => {
        setIsRunning(!isRunning);
    };

    const handleReset = () => {
        setIsRunning(false);
        setTime(0);
        setLaps([]);
        setCumulativeLaps([]);
    };

    const handleLap = () => {
        setLaps([...laps, time]);
        // For cumulative time, add the current time to the last cumulative time
        setCumulativeLaps([...cumulativeLaps, time + (cumulativeLaps[cumulativeLaps.length - 1] || 0)]);
    };

    const formatTime = (time: number) => {
        // Format time to HH:MM:SS.ms
        const milliseconds = time % 1000;
        const seconds = Math.floor(time / 1000) % 60;
        const minutes = Math.floor(time / 60000) % 60;
        const hours = Math.floor(time / 3600000);

        const pad = (num: number) => num.toString().padStart(2, '0');

        return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${Math.floor(milliseconds / 100)}`;
    };

    return (
        <div>
            <div>{formatTime(time)}</div>
            <StopWatchButton label={isRunning ? 'Stop' : 'Start'} onClick={handleStartStop} />
            <StopWatchButton label='Lap' onClick={handleLap} />
            <StopWatchButton label='Reset' onClick={handleReset} />
            <div style={{ maxHeight: '200px', overflowY: 'scroll' }}>
                {laps.map((lap, index) => (
                    <div key={index}>
                        <div>Lap #{laps.length - index}</div>
                        <div>Time: {formatTime(lap)}</div>
                        <div>Cumulative Time: {formatTime(cumulativeLaps[index])}</div>
                    </div>
                )).reverse()}
            </div>
        </div>
    );
};

export default StopWatch;
