import React from 'react'
import { useState, useEffect } from 'react'

export default function StopWatch() {

    const [timeInSeconds, setTimeInSeconds] = useState<number>(0)
    const [stopWatchTime, setStopWatchTime] = useState<Array<number | string>>([])

    function calculateTime(timeInSeconds: number): Array<number | string> {

        let hours: number= Math.floor(timeInSeconds/ 3600);
        let minutes: number= Math.floor((timeInSeconds - (hours * 3600)) / 60);
        let seconds: number= timeInSeconds - (hours * 3600) - (minutes * 60);

        let hoursFormat = hours < 10 ? `0${hours}` : hours;
        let minutesFormat = minutes < 10 ? `0${minutes}` : minutes;
        let secondsFormat = seconds < 10 ? `0${seconds}` : seconds;

        return [hoursFormat, minutesFormat, secondsFormat]
    }

    useEffect (() => {
        let stopWatchArray: Array<number | string> = calculateTime(timeInSeconds);
        setStopWatchTime(stopWatchArray)
    }, [timeInSeconds])
    

    return(
        <section className='stopwatch_container'>
            <span className='stopwatch_text'>{stopWatchTime[0]}</span>
            <span>:</span>
            <span className='stopwatch_text'>{stopWatchTime[1]}</span>
            <span>:</span>
            <span className='stopwatch_text'>{stopWatchTime[2]}</span>
        </section>
    )
}