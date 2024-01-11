import React, { useEffect, useState } from 'react'
import './css/App.css'

export default function StopWatch(props: any) {
    const [time, setTime] = useState(0);
    const [timeDisplay, setTimeDisplay] = useState<Array<number | string>>([]);
    const [intervalNumber, setIntervalNumber] = useState<number>(0);

    const convertTimeToDisplay = (time: number): (number | string)[] => {
        let hours = Math.floor(time / 3600);
        let minutes = Math.floor((time - (hours * 3600)) / 60);
        let seconds = time - (minutes * 60) - (hours * 3600)
        return [
            hours < 10 ? `0${hours}` : hours,
            minutes < 10 ? `0${minutes}` : minutes,
            seconds < 10 ? `0${seconds}` : seconds
        ];
    }

    useEffect(() => {
        if (props.isRunning) {
            const interval: any = setInterval(() => {
                setTime((time) => time + 1);
                console.log(time);
            }, 1000);
            setIntervalNumber(interval);
        } else {
            clearInterval(intervalNumber)
        }
        if (props.reset) {
            clearInterval(intervalNumber);
            setTime(0)
        }
        setTimeDisplay(convertTimeToDisplay(time));
    }, [props,time]);

    useEffect(() => {

    })

    return (
        <main className='timer-display'>
            <p id="hour">{timeDisplay[0]}</p>
            <span>:</span>
            <p id="minute">{timeDisplay[1]}</p>
            <span>:</span>
            <p id="second">{timeDisplay[2]}</p>
        </main>
    )
}