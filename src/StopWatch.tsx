import React, { useState, useEffect } from 'react'

export default function StopWatch() {
    const [currentTime, setCurrentTime] = useState(0) // state to store time
    const [isActive, setIsActive] = useState(true) // boolean state if timer is active

    // useEffect hook & setInterval method to calculate time
    useEffect(() => {
        let interval: number
        if (isActive) {
            interval = window.setInterval(() => {
                setCurrentTime((prevTime) => prevTime + 10);
            }, 10); // add 10 milliseconds to previous time per 10 ms ; 
        } else if (!isActive) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive]);

    // split currentTime into hours, minutes, seconds, and milliseconds to display for human eyes
    let currentHours: number = Math.floor((currentTime / 3600000) % 60)
    let currentMinutes: number = Math.floor((currentTime / 60000) % 60)
    let currentSeconds: number = Math.floor((currentTime / 1000) % 60)
    let currentMilliseconds: number = (currentTime / 10) % 100

    return (
        <div>
            <span>{("0" + currentHours).slice(-2)}:</span>
            <span>{("0" + currentMinutes).slice(-2)}:</span>
            <span>{("0" + currentSeconds).slice(-2)}:</span>
            <span>{("0" + currentMilliseconds).slice(-2)}</span>
            <p>{currentTime}</p></div>
    )
}