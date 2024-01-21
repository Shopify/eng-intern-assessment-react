import React, { useState, useEffect } from 'react';
import StopWatchButton from './StopWatchButton';
import '../styles/StopWatch.css';

const StopWatch = () => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [laps, setLaps] = useState<{ lapTime: number; totalTime: number }[]>([]);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (isRunning) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 100);
            }, 100);
        } else if (!isRunning && interval) {
            // Clear the interval when the stopwatch is stopped
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
    };

    const handleLap = () => {
        if (isRunning) {
            setLaps([...laps, { lapTime: time - (laps.slice(-1)[0]?.totalTime || 0), totalTime: time }]);
        }
    };

    const formatTime = (time: number) => {
        // Converting time into hours, minutes, seconds, and milliseconds
        const milliseconds = time % 1000;
        const seconds = Math.floor(time / 1000) % 60;
        const minutes = Math.floor(time / 60000) % 60;
        const hours = Math.floor(time / 3600000);
        const pad = (num: number) => num.toString().padStart(2, '0');
        return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${Math.floor(milliseconds / 100)}`;
    };

    return (
        <div className="stopwatch-container">
            <div className="clock-and-buttons">
                <div className="clock-display">{formatTime(time)}</div>
                <div className="buttons-container">
                    <StopWatchButton
                        label={isRunning ? 'Stop' : 'Start'}
                        onClick={handleStartStop}
                        buttonStyle={isRunning ? 'stop-button' : 'start-button'}
                        disabled={false}
                    />
                    <StopWatchButton
                        label='Lap'
                        onClick={handleLap}
                        buttonStyle='lap-button'
                        disabled={!isRunning} // Disable the Lap button when the stopwatch is not running
                    />
                    <StopWatchButton
                        label='Reset'
                        onClick={handleReset}
                        buttonStyle='reset-button'
                        disabled={false}
                    />
                </div>
            </div>
            <div className="lap-history-container">
            {[...laps].reverse().map((lap, index) => ( // Reverse the copy of laps array for rendering
                <div className="lap" key={index}>
                    <span>Lap #{laps.length - index}</span> 
                    <span>Time: {formatTime(lap.lapTime)}</span>
                    <span>Cumulative Time: {formatTime(lap.totalTime)}</span>
                </div>
                ))}
            </div>
        </div>
    );
};

export default StopWatch;
