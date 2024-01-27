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
    
    //Renders stop and start buttons based on start prop
    return(
        <div className='stopwatch-buttons'>
            {!start && <button data-testid="start-button" className="start-button" onClick={handleStart}>Start</button>}
            {start && <button data-testid="stop-button" className="stop-button" onClick={handleStop}>Stop</button>}
            <button data-testid="lap-button" className="lap-button" onClick={handleLap}>Lap</button>
            <button data-testid="reset-button" className="reset-button" onClick={handleReset}>Reset</button>
        </div>
    )
}