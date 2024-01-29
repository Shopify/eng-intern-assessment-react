import React from 'react';
import {useState, useEffect} from 'react';
import StopWatchButton from './StopWatchButton';
import Timer from './Timer';
import Laps from './Laps'
import {incrementTime} from './util';
import './StopWatch.css';

export default function StopWatch() {
    const [time, setTime] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [recordedLapTimes, setRecordedLapTimes] = useState<number[]>([]);

    /* 
    Increment the clock every 10 milliseconds via setTime
    setTime is called every 10 milliseconds via setInterval
    The function passed to useEffect is executed only when isRunning changes state
    When isRunning changes from false to true, the clock starts
    When isRunning changes from true to false, the clock stops via clearInterval and resources are returned to the system
    The function provided to useEffect returns a function that calls clearInterval, which helps to clean up
    */

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
    };
    const stopTimer = () => {
        setIsRunning(false);
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
        <div className = 'clock'>
            <Timer timeInMs={time}/>
            <div className = 'buttons'>      
                <StopWatchButton disabled = {isRunning} action = {startTimer} label = 'Start'  />
                <StopWatchButton disabled = {!isRunning} action = {stopTimer} label ='Stop' />                
                <StopWatchButton disabled = {!isRunning} action = {lapTimer} label = 'Lap'  />
                <StopWatchButton disabled = {false} action = {resetTimer} label='Reset' />
            </div>
            <div className = 'lap'>
                <Laps recordedLapTimes={recordedLapTimes}/>
            </div>      
        </div>
    )
}