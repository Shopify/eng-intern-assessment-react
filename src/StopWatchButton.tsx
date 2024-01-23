import React, {useState} from 'react'
import "./styles.css";

type Props = {
    setStart: Function;
    setStop: Function;
}

export default function StopWatchButton({setStart, setStop}: Props) {

    function handleStart(): void{
        setStart();
    }

    function handleStop(): void{
        setStop();
    }
    
    return(
        <div className='stopwatch-buttons'>
            <button className="start-button" onClick={handleStart}>Start</button>
            <button className="stop-button" onClick={handleStop}>Stop</button>
            <button className="lap-button">Lap</button>
            <button className="reset-button">Reset</button>
        </div>
    )
}