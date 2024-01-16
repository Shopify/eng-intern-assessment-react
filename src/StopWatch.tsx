import React, { useEffect, useRef, useState } from 'react'

export default function StopWatch() {

    const [time, setTime] = useState(3590000);
    const [now, setNow] = useState(0);
    const [milliseconds, setMiliseconds] = useState(null);
    const [seconds, setSeconds] = useState(null);
    const [minutes, setMinutes] = useState(null);
    const [hours, setHours] = useState(null);
    const [laps, setLaps] = useState([]);
    const [active, setActive] = useState(false);
    const interval = useRef(null);

    const startTimer = () => {
        setActive(true);
    }


    useEffect(() => {
        let startTime = Date.now()
        if(active){
            setNow(Date.now() - time);
            interval.current = setInterval(() => {
                setTime(Date.now() - now);
            }, 10)
        }else {
            clearInterval(interval.current);
          }
      
          return () => clearInterval(interval.current);
    })

    const pauseTimer = () => {
        setActive(false);
        clearInterval(interval.current);
    }

    const clearTimer = () => {
        setActive(false);
        setTime(0);
        setNow(0);
        clearInterval(interval.current);
        setLaps([]);
    }

    const lapTimer = () => {
        
    }
    const elapsedTime = time - now;

    const formatTime = () => {
        // convert milisecond units to milisecond, second, minute and hour
        // pad 0 before each time unit if the calculated time unit is a single digit
        let ms = Math.floor(time % 1000).toString().padStart(2, "0");
        let s =  Math.floor((time / 1000) % 60).toString().padStart(2, "0");
        let m =  Math.floor((time / 60000) % 60).toString().padStart(2, "0");
        let h =  Math.floor((time / 3600000)).toString().padStart(2, "0");
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
            {time}
            <div className="button-container">
                <button onClick={startTimer}>Start</button>
                <button onClick={pauseTimer}>Pause</button>
                <button onClick={clearTimer}>Reset</button>
                <button onClick={lapTimer}>Lap</button>
            </div>
        </div>
    )
}