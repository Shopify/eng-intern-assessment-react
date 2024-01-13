import React, { useEffect, useState } from 'react';
import StopWatch from './StopWatch';
import './css/App.css';

export default function App() {
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [reset, setReset] = useState<boolean>(false);
    const [time, setTime] = useState<number>(0);
    const [timeDisplay, setTimeDisplay] = useState<Array<number | string>>([]);
    const [laps, setLaps] = useState<Array<number>>([]);

    /**
    * @description Convert Function used to convert time in (s) to a displayable time
    * @param {number} time => time in seconds
    * @returns {(number | string)[]} array of strings and numbers in display format
    **/
    const convertTimeToDisplay = (time: number): (number | string)[] => {
        let hours = Math.floor(time / 3600);
        let minutes = Math.floor((time - (hours * 3600)) / 60);
        let seconds = time - (minutes * 60) - (hours * 3600);
        return [
            hours < 10 ? `0${hours}` : hours,
            minutes < 10 ? `0${minutes}` : minutes,
            seconds < 10 ? `0${seconds}` : seconds
        ];
    }

    /**
    * @description Handles when start is pressed, sets state isRunning to true so timer will
    * increment and if the time has not started yet or was reset, initialize laps which will
    * trigger useEffect 
    **/
    const handleOnStart = () => {
        setIsRunning(true);
        if (time == 0) {
            initializeLaps();
        }
    }

    /**
    * @description Handles when stop is pressed, sets  state isRunning ot false so timer will
    * stop incrementing time which will trigger useEffect
    **/
    const handleOnStop = () => {
        setIsRunning(false);
    }

    /**
    * @description Handles when reset is pressed, sets Reset state to true which will trigger 
    * useEffect
    **/
    const handleReset = () => {
        setReset(true);
    }

    /**
    * @description Initializing Laps with time = 0
    **/
    const initializeLaps = () => {
        setLaps([0]);
    }

    /**
    * @description Handles when lap is being pressed, if time != 0 , sets the laps with the 
    * previous laps spread nad the current time
    **/
    const handleLap = () => {
        if (time != 0) {
            setLaps((prevLaps) => [...prevLaps, time]);
        }
    }

    /**
    * @description useEffect will update whenever reset, isRunning, or time is changed 
    * logic that increments time per 1000ms is done when isRunning is true, if isRunning 
    * is set to false, it will stop the timed action, and if reset is true, it will set
    * isRunning to false, the time to 0, reset to false, and will reset the laps to empty
    * @return returns clearInterval which will canceled the timed action
    **/
    useEffect(() => {
        let intervalId: NodeJS.Timeout;
        if (isRunning) {
            intervalId = setInterval(() => setTime(time + 1), 1000);
        } else {
            clearInterval(intervalId);
        }
        if (reset) {
            setIsRunning(false);
            setTime(0);
            setReset(false);
            setLaps([]);
        }
        setTimeDisplay(convertTimeToDisplay(time));
        return () => {
            clearInterval(intervalId);
        };
    }, [reset, isRunning, time]);

    // App display with Stopwatch, buttons, and lap list
    return (
        <div>
            <StopWatch timeDisplay={timeDisplay} start={handleOnStart} stop={handleOnStop}
                reset={handleReset} lap={handleLap} laps={laps} />
        </div>
    )
}
