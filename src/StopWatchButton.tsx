import React, {useState} from 'react'
import "./StopWatch.css"
type ButtonProps = {
    setTimeInSec : Function
};
export default function StopWatchButton(props:ButtonProps) {
    const {setTimeInSec} =props;
    //Keeping track of intervalId to Start/Stop Timer Dynamically
    const [intervalId, setIntervalId]= useState(0);


    function handleStart() {
        // Increments timeInSec by 1 after every second
        let intervalId:any = setInterval(()=>{setTimeInSec((previousTime:number)=>previousTime+1)},1000)
        setIntervalId(intervalId);
    }

    function handleStop() {
       clearInterval(intervalId);
    }

    function handleReset() {
        clearInterval(intervalId);
        setTimeInSec(0);

    }

    function handleLap() {

    }

    return(
        <div>
            <div className="buttons-container">
           <button onClick={handleStart}>Start</button>
            <button onClick={handleStop}>Stop</button>
            <button onClick={handleReset}>Reset</button>
            <button onClick={handleLap}>Lap</button>
            </div>
        </div>
    )
}