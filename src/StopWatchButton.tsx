import React, {useState} from 'react'
import "./styles.css";

type Props = {
    setStart: Function;
    setStop: Function;
    setReset: Function;
}

export default function StopWatchButton({setStart, setStop, setReset}: Props) {

    //Handler functions for buttons
    function handleStart(): void{
        setStart();
    }
    function handleStop(): void{
        setStop();
    }
    function handleReset(): void{
        setReset();
    }
    
    return(
        <div className='stopwatch-buttons'>
            <button className="start-button" onClick={handleStart}>Start</button>
            <button className="stop-button" onClick={handleStop}>Stop</button>
            <button className="lap-button">Lap</button>
            <button className="reset-button" onClick={handleReset}>Reset</button>
        </div>
    )
}