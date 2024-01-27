import React from 'react';
import {useState, useEffect} from 'react';
import StopWatchButton from './StopWatchButton';
import Timer from './Timer';

export default function StopWatch() {
    const [time, setTime] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [recordedLapTimes, setRecordedLapTimes] = useState<number[]>([]);

    useEffect(() => {
        let interval : ReturnType<typeof setInterval> = null;

        if (isRunning) {
            interval = setInterval(() => {
                setTime(time => time + 10);
            }, 10);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isRunning]);



    const startTimer = () => {
        setIsRunning(true);
        console.log('Start Timer');
    };
    const stopTimer = () => {
        setIsRunning(false);
        console.log('Stop Timer');
    };
    const lapTimer =() => {
        console.log('Lap Timer');
    };
    const resetTimer = () => {
        setIsRunning(false);
        setTime(0);
        console.log('Reset Timer');
    };

    return(
        <>
            <Timer timeInMs={time}/>
            <StopWatchButton disabled = {isRunning} action = {startTimer} label = 'Start'/>
            <StopWatchButton disabled = {!isRunning} action = {stopTimer} label ='Stop'/>
            <StopWatchButton disabled = {!isRunning} action = {lapTimer} label = 'Lap'/>
            <StopWatchButton disabled = {false} action = {resetTimer} label='Reset'/>
        </>
    )
}