import React, { useState, useEffect } from 'react';

const StopWatchButton: React.FC = () => {

    //using state to keep track of diffrent instances and updating them
    const [time, setTime] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [laps, setLaps] = useState<number[]>([]);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (isRunning) {
            // Update time every 10 milliseconds
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 10);
            }, 10);
        } else if (!isRunning && interval) {
            clearInterval(interval);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isRunning]);

    //Implementing logic for RESET button
    const handleReset = () => {setTime(0);
                                setIsRunning(false)
                                setLaps([])}
    
    //Implementing logic for START button
    const handleStart = () => setIsRunning(true);
    
    //Implementing logic for STOP button
    const handleStop = () => {
        setIsRunning(false);
    };

    //Implementing logic for LAP button
    const handleLap = () => {
        if (isRunning) {
            setLaps([...laps, time]);
        }
    };


    //Function to format time in minutes:seconds:millisecondss
    const formatTime = (milliseconds: number) => {
        const minutes = Math.floor(milliseconds / 60000);
        const seconds = Math.floor((milliseconds % 60000) / 1000);
        const miliseconds = (milliseconds % 1000) / 10;

        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}:${miliseconds < 10 ? '0' : ''}${miliseconds}`;
    };

    return (
        <div>
            
            {/*Printing the time*/}
            <h2>{formatTime(time)}</h2>

            {/*Printing laps when button is pressed*/}
            {laps.length > 0 && (
                <ul>
                    {laps.map((lap, index) => (
                        <li key={index}>Lap {index + 1}: {formatTime(lap)} Seconds</li>
                    ))}
                </ul>
            )}

            {/*buttons to use*/}
             <button onClick={handleStart}>Start</button>
            <button onClick={handleStop}>Stop</button>
            <button onClick={handleLap}>Lap</button>
            <button onClick={handleReset}>Reset</button>
            {/*Unnecessary p tag which a Unnecessary statement*/}
            <p>I have no styling done here as no styling rules have been defined. And as we all know, 
                until the client wants it, you dont do it.
            </p>
        </div>
    );
};

export default StopWatchButton;
