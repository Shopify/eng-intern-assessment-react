import React from 'react';
import {useState} from 'react';
import StopWatchButton from './StopWatchButton';

export default function StopWatch() {
    const [time, setTime] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [recordedLapTimes, setRecordedLapTimes] = useState<number[]>([]);

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
            <div>00:00:00.00</div>
            <StopWatchButton disabled = {isRunning} action = {startTimer} label = 'Start'/>
            <StopWatchButton disabled = {!isRunning} action = {stopTimer} label ='Stop'/>
            <StopWatchButton disabled = {!isRunning} action = {lapTimer} label = 'Lap'/>
            <StopWatchButton disabled = {false} action = {resetTimer} label='Reset'/>
        </>
    )
}