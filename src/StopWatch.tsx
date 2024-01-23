import React, { useEffect } from 'react'
import "./styles.css";

type Props = {
    start: boolean;
    time: number;
    setTime: Function;
}

export default function StopWatch({start, time, setTime}: Props) {
    //Initializing useState for the stopwatch

    //useEffect with time rerendering on start and time states
    useEffect(()=>{
        let interval: ReturnType<typeof setTimeout>;
        if (start) {
            interval = setInterval(()=> setTime(time+1), 10);
        }
        return () => clearInterval(interval);
    }, [start, time]);

    //Calculations for stopwatch for display
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