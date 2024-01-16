import React, { useState, useEffect } from 'react';
import './StopWatch.css';
import StopWatchButton from './StopWatchButton';

export default function StopWatch() {
    const [timeInSeconds, setTimeInSeconds] = useState<number>(0);
    const [timerArray, setTimerArray] = useState<Array<number | string>>([]);
    const [isRunning, setIsRunning] = useState<boolean>(false);

    function calculateTime(timeInSeconds: number): Array<number | string> {
        let hours: number = Math.floor(timeInSeconds /3600);
        let minutes: number = Math.floor((timeInSeconds - (hours *3600)) / 60);
        let seconds: number = Math.floor(timeInSeconds - (hours * 3600) - (minutes * 60));
        let hoursFormatted = hours < 10 ? `0${hours}` : hours;
        let minutesFormatted = minutes < 10 ? `0${minutes}` : minutes;
        let secondsFormatted = seconds < 10 ? `0${seconds}` : seconds;

        return [hoursFormatted, minutesFormatted, secondsFormatted];
    }

    useEffect(() => {
        let timerArray: Array<number | string> = calculateTime(timeInSeconds);
        setTimerArray(timerArray);
    }, [timeInSeconds]);//everytime timeInSeconds gets updated, this hook gets called to populate the timerArray

    const handleStartStop = () => {//flips isRunning based on start-stop
        setIsRunning(!isRunning);
    };

    const handleReset = () => {//resets the time and negates isRunning
        setTimeInSeconds(0);
        setIsRunning(false);
    };


    return(
        <div className='stopwatch-div'>
            <div className='stopwatch-time'>{`${timerArray[0]}:${timerArray[1]}:${timerArray[2]}`}</div>
            <StopWatchButton onClick={handleStartStop} label={isRunning ? 'Stop' : 'Start'} />
            <StopWatchButton onClick={handleReset} label={isRunning ? 'Lap' : 'Reset'} />
        </div>
    );
}