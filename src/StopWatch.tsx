import React from 'react';
import {useState, useEffect} from 'react';
import StopWatchButton from './StopWatchButton';
import Timer from './Timer';
import Laps from './Laps'
import {incrementTime} from './util';

export default function StopWatch() {
    const [time, setTime] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [recordedLapTimes, setRecordedLapTimes] = useState<number[]>([]);

    useEffect(() => {
        let interval : ReturnType<typeof setInterval> = null;

        if (isRunning) {
            interval = setInterval(() => {
                setTime(incrementTime);
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
        setRecordedLapTimes([... recordedLapTimes, time]);
    };
    const resetTimer = () => {
        setIsRunning(false);
        setTime(0);
        setRecordedLapTimes([]);
    };

    return(
        <>
            <Timer timeInMs={time}/>
            <Laps recordedLapTimes={recordedLapTimes}/>
            <StopWatchButton disabled = {isRunning} action = {startTimer} label = 'Start'/>
            <StopWatchButton disabled = {!isRunning} action = {stopTimer} label ='Stop'/>
            <StopWatchButton disabled = {!isRunning} action = {lapTimer} label = 'Lap'/>
            <StopWatchButton disabled = {false} action = {resetTimer} label='Reset'/>
        </>
    )
}