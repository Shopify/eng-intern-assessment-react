import React, { useState, useEffect } from 'react'
import StopWatchButton from '../StopWatchButton/StopWatchButton';

export default function StopWatch() {
    const [currentTime, setCurrentTime] = useState(0); // state to store time
    const [isActive, setIsActive] = useState(false); // boolean state if timer is active
    const [laps, setLaps] = useState([]); // state to store laps

    // useEffect hook & setInterval method to calculate time
    useEffect(() => {
        let interval: number
        if (isActive) {
            interval = window.setInterval(() => {
                setCurrentTime((prevTime) => prevTime + 10);
            }, 10); // add 10 milliseconds to previous time per 10 ms ; 
        } else if (!isActive) {
            clearInterval(interval);
        };
        return () => clearInterval(interval);
    }, [isActive]);

    // helper functions to split time into hours, minutes, seconds, and milliseconds
    function hoursInTime(time: number) {
        return Math.floor((time / 3600000) % 60);
    };
    function minutesInTime(time: number) {
        return Math.floor((time / 60000) % 60);
    };
    function secondsInTime(time: number) {
        return Math.floor((time / 1000) % 60);
    };
    function millisecondsInTime(time: number) {
        return (time / 10) % 100;
    };

    // event handlers for start, pause, reset, and lap buttons
    const handleStart = () => {
        setIsActive(true)
    };

    const handlePause = () => {
        setIsActive(false)
    };

    const handleReset = () => {
        setCurrentTime(0)
        setIsActive(false)
        setLaps([])
    };

    const handleLap = () => {
        if (currentTime) { // only lap if currentTime is not zero, to protect against accidental double-clicks
            setLaps([...laps, currentTime])
            setCurrentTime(0)
        };

    };

    // helper function to display time in hh:mm:ss:mm format for human readability
    function readableTime(hours: number, minutes: number, seconds: number, milliseconds: number) {
        return ("0" + hours).slice(-2) + ":" + ("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2) + ":" + ("0" + milliseconds).slice(-2)
    };

    // render stopwatch interface, including time, buttons, and laps
    return (
        <section className='stopwatch__container'>
            <article className="time__container">
                <h2 className='time__text'>{readableTime(hoursInTime(currentTime), minutesInTime(currentTime), secondsInTime(currentTime), millisecondsInTime(currentTime))}</h2>
            </article>

            <article className="button__container">
                <StopWatchButton onClick={handleStart} buttonName="Start" />
                <StopWatchButton onClick={handlePause} buttonName="Pause" />
                <StopWatchButton onClick={handleReset} buttonName="Reset" />
                <StopWatchButton onClick={handleLap} buttonName="Lap" />
            </article>

            <article className="lap__container">
                <ol id='lap-list' type="i">
                    {laps.map((t, i) => {
                        return <li key={i} className='lap__item'>{readableTime(hoursInTime(laps[i]), minutesInTime(laps[i]), secondsInTime(laps[i]), millisecondsInTime(laps[i]))}</li>
                    })}
                </ol>
            </article>
        </section>
    )
};