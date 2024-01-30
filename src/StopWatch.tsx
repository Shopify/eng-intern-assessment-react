import React, { useState, useEffect } from 'react';
import './assets/StopWatch.css';
import StopwatchTimer from './StopWatchTimer';
import StopwatchButton from './StopWatchButton';

interface StopwatchProps { }

const Stopwatch: React.FC<StopwatchProps> = () => {
    const [time, setTime] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);

    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        if (isRunning) {
            intervalId = setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10);
        }

        return () => clearInterval(intervalId);
    }, [isRunning]);

    const startStopwatch = () => {
        setIsRunning(true);
    };

    const stopStopwatch = () => {
        setIsRunning(false);
    };

    const resetStopwatch = () => {
        setTime(0);
        setIsRunning(false);
    };

    return (
        <div className="stopwatch-container">
            <StopwatchTimer time={time} />
            <div className="button-container">
                {isRunning ? (
                        <StopwatchButton
                            label={"Stop"}
                            className={"stop-button"}
                            onClick={stopStopwatch}
                        />
                ) : (
                    <>
                        <StopwatchButton
                            label={"Start"}
                            className={"start-button"}
                            onClick={startStopwatch}
                        />
                        <StopwatchButton
                            label={"Reset"}
                            className={"reset-button"}
                            onClick={resetStopwatch}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default Stopwatch;
