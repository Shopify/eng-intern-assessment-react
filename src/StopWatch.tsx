import React, { useEffect } from 'react'
import "./styles.css";
import logo from "../public/Shopify-Logo.png";

type Props = {
    start: boolean;
    time: number;
    setTime: Function;
}

export default function StopWatch({start, time, setTime}: Props) {

    //useEffect with time rerendering on start and time states
    useEffect(()=>{
        let interval: ReturnType<typeof setTimeout>;
        if (start) {
            //Increments stopwatch
            interval = setInterval(()=> setTime(time+1), 10);
        }
        return () => clearInterval(interval);
    }, [start, time]);

    //Calculations for stopwatch display
    const hours = Math.floor(time/360000);
    const minutes = Math.floor((time % 360000)/6000);
    const seconds = Math.floor((time%6000)/100);
    const milliseconds = Math.floor(time%100);

    return(
        <div className='stopwatch'>
            <img className="logo" src={logo} alt="Shopify_Logo"></img>
            <p className='title'>Miruo's Stopwatch</p>
            <p data-testid="stopwatch-time" className='stopwatch-time'>{hours}:{minutes.toString().padStart(2,"0")}:
            {seconds.toString().padStart(2, "0")}:
            {milliseconds.toString().padStart(2, "0")}
            </p>
        </div>
    )
}