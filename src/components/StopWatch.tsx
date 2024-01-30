import React, { useState, useEffect, useRef } from 'react';
import '../styles/StopWatch.css';

import StopWatchButton from './StopWatchButton';

const StopWatch: React.FC = () => {
    /*
     *
     * @description States for the StopWatch component
     * 
     * @state startTime: number | null
     * @state elapsedTime: number
     * @state isRunning: boolean
     * @state laps: number[]
     * @state lapsEndRef: React.RefObject<HTMLDivElement>
     *
     */
    const [startTime, setStartTime] = useState<number | null>(null);
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    const [isRunning, setRunning] = useState<boolean>(false);
    const [laps, setLaps] = useState<number[]>([]);
    const lapsEndRef = useRef(null);

    /*
     *
     * @description Effect to update the elapsed time of the StopWatch component
     *
     */
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

    /*
     *
     * @description Effect to scroll to the bottom of the laps list
     *
     */
    const scrollToBottom = () => {
        lapsEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    /*
     *
     * @description Effect to scroll to the bottom of the laps list when a new lap is added
     *
     */
    useEffect(() => {
        if (laps.length > 0) {
            scrollToBottom();
        }
    }, [laps]); 

    
    /*
     *
     * @description Handler for the Start/Stop button
     *
     */
    const clickStartStop = () => {
        if (isRunning) {
            setRunning(false);
        } else {
            setRunning(true);
            const currentTime = new Date().getTime();
            setStartTime(currentTime - elapsedTime);
        }
    };

    /*
     *
     * @description Handler for the Lap button
     *
     */
    const clickLap = () => {
        if (isRunning) {
            setLaps(prevLaps => [...prevLaps, elapsedTime]);
        }
    };

    /*
     *
     * @description Handler for the Reset button
     *
     */
    const clickReset = () => {
        setRunning(false);
        setElapsedTime(0);
        setLaps([]);
        setStartTime(null);
    };

    /*
     *
     * @description Helper to format the time
     *
     */
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

                <div className='watch-timer' role='timer'>
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