import React, { useEffect } from 'react';
import { useState } from 'react';
import { StopWatchProps } from '../../props/StopWatchProps';
import StopWatchButton from './StopWatchButton';
import { StopWatchLap } from './StopWatchLap';
import { containerStyles, titleStyle } from '../../styles/StopWatchStyles';

export default function StopWatch(
    {
        id = Math.random(),
        title,
        time = 0,
        timelaps = []
    }: StopWatchProps) {

    // Hooks:
    const [runningTime, setRunningTime] = useState(Math.max(time, 0));
    const [displayTime, setDisplayTime] = useState("00:00:00");
    const [increment, setIncrement] = useState(10); // increment of increase in milliseconds
    const [isRunning, setIsRunning] = useState(false);
    const [laps, setLaps] = useState(timelaps);

    // Constants:
    const MAX_LAPS_DISPLAY_NUM = 5; // maximum laps displayed

    // Functions:
    const IncrementTimer = () => {
        setRunningTime(priorTime => priorTime + increment);
    };

    const StartTimer = () => {
        setIsRunning(true);
    };

    const StopTimer = () => {
        setIsRunning(false);
    };

    const ResetTimer = () => {
        StopTimer();
        setRunningTime(0);
    };

    const AddLap = () => {
        setLaps(prevLaps => [...prevLaps, { displayTime: displayTime, time: runningTime }]);
    };

    const UpdateDisplayTime = () => {
        const miliseconds = Math.floor((runningTime / 10) % 100);
        const seconds = Math.floor((runningTime / 1000) % 60);
        const minutes = Math.floor(seconds / 60);

        const display = (minutes / 10 < 1 ? "0" : "") + String(minutes) + ":"
            + (seconds / 10 < 1 ? "0" : "") + String(seconds) + ":" + (miliseconds / 10 < 1 ? "0" : "") + String(miliseconds);

        setDisplayTime(display);
    };

    // Set displayTime on component first render
    useEffect(() => {
        UpdateDisplayTime();
    }, []);

    // Update displayTime accordingly to runningTime
    useEffect(() => {
        UpdateDisplayTime();
    }, [runningTime]);

    /**
     * Update timer if isRunning is true,
     * else stop the timer.
     * */
    useEffect(() => {
        let interval: number | string | NodeJS.Timeout;

        if (isRunning) {
            interval = setInterval(() => {
                IncrementTimer();
            }, 10);
        } else {
            clearInterval(interval);
        };

        return () => { clearInterval(interval) };

    }, [isRunning]);


    return (
        <div>
            <div className='stopwatch-title' style={titleStyle}>{title}</div>
        <div className='stopwatch-container' style={containerStyles.stopwatchContainer}>
            <div className='stopwatch-timer' style={containerStyles.stopwatchTimer} title='timer'>
                {displayTime}
            </div>
            <div className='stopwatch-button-container' style={containerStyles.stopwatchButtonContainer}>
                <StopWatchButton title='Start' callback={StartTimer} />
                <StopWatchButton title='Stop' callback={StopTimer} />
                <StopWatchButton title='Reset' callback={ResetTimer} />
                <StopWatchButton title='Lap' callback={AddLap} />
            </div>
            <div className='stopwatch-lap-container' style={containerStyles.stopwatchLapContainer} title='laps'>
                {
                    // display most recent MAX_LAPS_DISPLAY_NUM laps
                    laps.slice(0).reverse().slice(0, MAX_LAPS_DISPLAY_NUM).map(
                        (lap) => { return <StopWatchLap key={lap.time} time={lap.time} displayTime={lap.displayTime} /> })
                }
            </div>
        </div>
        </div>
    );
};
