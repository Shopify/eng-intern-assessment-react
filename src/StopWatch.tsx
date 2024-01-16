import React, { useEffect, useRef, useState } from 'react'

export default function StopWatch() {

    const [time, setTime] = useState(354000);
    const [milliseconds, setMiliseconds] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);
    const [laps, setLaps] = useState([]);
    const [active, setActive] = useState(false);
    let interval = useRef(null);
    /*useEffect (() => {
        let interval;
        if(active){
            interval = setInterval(() => setTime(time+1),10)
            console.log(time);
        }
        return clearInterval(interval);
    }, [active, time]);*/

    const startTimer = () => {
        if (active) return;
        setActive(true);
        interval.current = setInterval(() => {
            setTime((prev) => prev + 1);
        }, 10)
        console.log(time);
    }

    const pauseTimer = () => {
        setActive(false);
        clearInterval(interval.current);
    }

    const clearTimer = () => {
        setActive(false);
        setTime(0);
        clearInterval(interval.current);
        setLaps([]);
    }

    const lapTimer = () => {

    }

    const formatTime = () => {
        // convert milisecond units to milisecond, second, minute and hour
        // pad 0 before each time unit if the calculated time unit is a single digit
        let ms = Math.floor(time % 100).toString().padStart(2, "0");
        let s =  Math.floor((time / 100) % 60).toString().padStart(2, "0");
        let m =  Math.floor((time / 6000) % 60).toString().padStart(2, "0");
        let h =  Math.floor((time / 360000)).toString().padStart(2, "0");
        /*setMiliseconds(ms);
        setSeconds(s);
        setMinutes(m);
        setHours(h);*/
       return {h, s, m, ms}
    }

    const {h, m, s, ms} = formatTime();


    return (
        <div>
            {h}<br></br>
            {m}<br></br>
            {s}<br></br>
            {ms}<br></br>
            <div className="button-container">
                <button onClick={startTimer}>Start</button>
                <button onClick={pauseTimer}>Pause</button>
                <button onClick={clearTimer}>Reset</button>
            </div>
        </div>
    )
}