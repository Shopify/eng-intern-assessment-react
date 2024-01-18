import React, { useEffect } from 'react'
import { useState } from 'react'
import { StopWatchProps } from '../props/StopWatchProps'
import StopWatchButton from './StopWatchButton';
import { StopWatchLap } from './StopWatchLap';
import './StopWatchStyles.css'

export default function StopWatch(
    {
    id = Math.random(),
    title,
    time = 0,
    timelaps = [],
    }: StopWatchProps) {

    // Hooks:
    const [runningTime, setRunningTime] = useState(time);
    const [displayTime, setDisplayTime] = useState("00:00:000");
    const [increment, setIncrement] = useState(10); // increment of increase in milliseconds
    const [isRunning, setIsRunning] = useState(false);
    const [laps, setLaps] = useState(timelaps);

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
        setLaps(prevLaps => [...prevLaps, {displayTime: displayTime, time: runningTime}]);
    };

    const GetDisplayTime = () => {
        const miliseconds = Math.floor((runningTime / 10) % 100);
        const seconds = Math.floor((runningTime / 1000) % 60);
        const minutes = Math.floor(seconds / 60);

        const display = (minutes / 10 < 1 ? "0" : "") + String(minutes) + ":" 
        + (seconds / 10 < 1 ? "0" : "") + String(seconds) + ":" + String(miliseconds);
        
        setDisplayTime(display);
    };

    // Set displayTime on component first render
    useEffect(() => {
        GetDisplayTime();
    }, []);

    // Update displayTime accordingly to runningTime
    useEffect(() => {
        GetDisplayTime();
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

        return () => {clearInterval(interval)};

    }, [isRunning]);


    return(
        <div className='stopwatch-container'>
            <div className='stopwatch-timer'>
                {displayTime}
            </div>
            <div className='stopwatch-button-container'>
                <StopWatchButton title='Start' callback={StartTimer}/>
                <StopWatchButton title='Stop' callback={StopTimer}/>
                <StopWatchButton title='Reset' callback={ResetTimer}/>
                <StopWatchButton title='Lap' callback={AddLap}/>
            </div>
            {
                laps.map((lap) => {return <StopWatchLap time={lap.time} displayTime={lap.displayTime}/>})
            }
        </div>
    );
};
