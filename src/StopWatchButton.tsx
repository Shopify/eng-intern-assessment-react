import React, {useState} from 'react'
import "./styles.css";

type Props = {
    setStart: Function;
    setStop: Function;
    setReset: Function;
    setLap: Function;
    start: boolean;
}

export default function StopWatchButton({setStart, setStop, setReset, setLap, start}: Props) {

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
    function handleLap(): void{
        setLap();
    }
    
    return(
        <div className='stopwatch-buttons'>
            {!start && <button className="start-button" onClick={handleStart}>Start</button>}
            {start && <button className="stop-button" onClick={handleStop}>Stop</button>}
            <button className="lap-button" onClick={handleLap}>Lap</button>
            <button className="reset-button" onClick={handleReset}>Reset</button>
        </div>
    )
}