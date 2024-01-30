import React, { useState, useEffect } from 'react';
import StopWatchButton from './StopWatchButton';
import "./StopWatch.css";

export default function StopWatch() {
    // Initialize time values
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);
    const [miliseconds, setMiliseconds] = useState(0);

    // Initialize laps
    const [laps, setLaps] = useState([]);

    // Initialize timer running state
    const [isRunning, setIsRunning] = useState(false);


    // Format how time is displayed when not double-digit (i.e. 09 vs 9)
    const timeFormat = (number : number) => {
        if (number < 10) return "0" + number;
        else return number.toString();
    };


    // Calculate lap
    const calculateLap = (timeString1 : string, timeString2 : string) => {
        const time1 = new Date(`1970-01-01T${timeString1}Z`);
        const time2 = new Date(`1970-01-01T${timeString2}Z`);
        const timeDiff = Math.abs(Number(time2) - Number(time1));
        const hours = Math.floor(timeDiff / 3600000).toString().padStart(2, "0");
        const minutes = Math.floor((timeDiff % 3600000) / 60000).toString().padStart(2, "0");
        const seconds = Math.floor((timeDiff % 60000) / 1000).toString().padStart(2, "0");
        const milliseconds = ((timeDiff % 1000) / 10).toString().padStart(2, "0");
        const resultString = `${hours}:${minutes}:${seconds}.${milliseconds}`;
        return resultString;
    };

    // Timer running based off miliseconds
    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isRunning) {
        interval = setInterval(() => {
            setMiliseconds((miliseconds : number) => {
            if (miliseconds >= 99) {
                setSeconds((seconds : number) => {
                if (seconds >= 59) {
                    setMinutes((minutes : number) => {
                    if (minutes >= 59) {
                        setHours((prevHours : number) => prevHours + 1);
                        return 0;
                    } else {
                        return minutes + 1;
                    }
                    });
                    return 0;
                } else {
                    return seconds + 1;
                }
                });
                return 0;
            } else {
                return miliseconds + 1;
            }
            });
        }, 10);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    
    // Start button function: timer starts counting
    const startFunction = () => {
        setIsRunning(true);
    };


    // Stop button function: timer stops counting
    const stopFunction = () => {
        setIsRunning(false);
    };


    // Lap button function: display lap to user at time of click
    const lapFunction = () => {
        const lapDisplay =
        timeFormat(hours) + ":" + timeFormat(minutes) + ":" + timeFormat(seconds) + ":" +timeFormat(miliSeconds);
        setLaps((prevLaps) => [...prevLaps, lapDisplay]);
    };


    // Reset button function: timer resets to 0
    const resetFunction = () => {
        setIsRunning(false);
        setMiliseconds(0);
        setSeconds(0);
        setMinutes(0);
        setHours(0);
        setLaps([]);
    };

    return (
        <div className="container">
            <div className="timeDisplay">
                {timeFormat(hours)} : {timeFormat(minutes)} :{" "} {timeFormat(seconds)} : {timeFormat(miliseconds)}
            </div>
            <StopWatchButton onStart={startFunction} onStop={stopFunction} onLap={lapFunction} onReset={resetFunction} isRunning={isRunning}/>
        </div>
    );
}