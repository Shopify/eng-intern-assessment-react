import React, { useState, useEffect, useRef } from 'react';
import '../styles/StopWatch.css';

import StopWatchButton from './StopWatchButton';

const StopWatch: React.FC = () => {
    const [startTime, setStartTime] = useState<number | null>(null);
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    const [isRunning, setRunning] = useState<boolean>(false);
    const [laps, setLaps] = useState<number[]>([]);
    const lapsEndRef = useRef(null);

    useEffect(() => {
        let frameRequest: number;
    
        const updateElapsedTime = () => {
            if (isRunning) {
                const currentTime = new Date().getTime();
                const elapsedTime = currentTime - (startTime ?? currentTime);
                setElapsedTime(elapsedTime);
                frameRequest = requestAnimationFrame(updateElapsedTime);
            }
        };
    
        if (isRunning) {
            frameRequest = requestAnimationFrame(updateElapsedTime);
        }
    
        return () => {
            cancelAnimationFrame(frameRequest);
        };
    }, [isRunning, startTime]);

    const scrollToBottom = () => {
        lapsEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (laps.length > 0) {
            scrollToBottom();
        }
    }, [laps]); 

    const clickStartStop = () => {
        if (isRunning) {
            setRunning(false);
        } else {
            setRunning(true);
            const currentTime = new Date().getTime();
            setStartTime(currentTime - elapsedTime);
        }
    };

    const clickLap = () => {
        if (isRunning) {
            setLaps(prevLaps => [...prevLaps, elapsedTime]);
        }
    };

    const clickReset = () => {
        setRunning(false);
        setElapsedTime(0);
        setLaps([]);
        setStartTime(null);
    };

    const formatTime = (time: number) => {
        const centisecs = Math.floor((time % 1000) / 10); 
        const secs = (Math.floor(time / 1000) % 60);
        const mins = (Math.floor(time / (1000 * 60)) % 60);

        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}:${centisecs.toString().padStart(2, '0')}`;
    }

    return (
        <div className='watch-container'>
            <div className='upper-container'>
                <h2 className='watch-title'> Stopwatch </h2>

                <div className='watch-timer'>
                    { formatTime(elapsedTime) }
                </div>

                <div className='watch-buttons'>
                    <StopWatchButton onClick={clickLap} label={'Lap'} />
                    <StopWatchButton onClick={clickStartStop} label={isRunning ? 'Stop' : 'Start'} />
                    <StopWatchButton onClick={clickReset} label={'Reset'} />
                </div>
            </div>

            <div className='laps-container'>
                {laps.length > 0 && (
                    <ul className='laps-item-list'>
                        {laps.map((lap, count) => (
                            <li key={count} className='laps-item'>
                                {"Lap " + (count + 1) + " - " + formatTime(lap)}
                            </li>
                        ))}
                    </ul>
                )}
                <div ref={lapsEndRef} />
            </div>
        </div>
    );
};

export default StopWatch;