import React, { useState, useEffect } from 'react'
import "./styles.css";

type Props = {
    start: boolean
}

export default function StopWatch({start}: Props) {
    //Initializing useState for the stopwatch
    const [time, setTime] = useState(0);

    //useEffect with dependency array rerendering on start and time states
    useEffect(()=>{
        let interval: ReturnType<typeof setTimeout>;
        if (start) {
            interval = setInterval(()=> setTime(time+1), 10);
        }
        return () => clearInterval(interval);
    }, [start, time])

    //Calculations for stopwatch
    const hours = Math.floor(time/360000);
    const minutes = Math.floor((time % 360000)/6000);
    const seconds = Math.floor((time%6000)/100);
    const milliseconds = Math.floor(time%100);

    return(
        <div className='stopwatch'>
            <p className='title'>Miruo's Stopwatch</p>
            <p className='stopwatch-time'>{hours}:{minutes.toString().padStart(2,"0")}:
            {seconds.toString().padStart(2, "0")}:
            {milliseconds.toString().padStart(2, "0")}
            </p>
        </div>
    )
}