import { INSPECT_MAX_BYTES } from 'buffer';
import React, { useState, useEffect } from 'react';
import './App.css';
import StopWatchButton from './StopWatchButton';

//Component that handles all stopwatch functionality
export default function StopWatch() {
    const [millisecondsPassed,setMillisecondsPassed]=useState(0); 
    const [paused, setPaused]=useState(true)
    const [laps, setLaps]=useState([])

    //useEffect hook that sets up a timer to increment millisecondsPassed state every 10 ms.
    //Cleans up interval when component dismounts.
    useEffect(()=>{
        let interval: NodeJS.Timer;

        if(paused){
            clearInterval(interval);
        }
        else{ 
            interval=setInterval(()=>{
                setMillisecondsPassed(prevMilliseconds=>prevMilliseconds+1); 
            }, 10);  
        } 

        return () => clearInterval(interval);
    }) 

    //OnClick functions passed to StopWatchButton components
    const play=()=>{
        setPaused(false);
    }
    const pause=()=>{
        setPaused(true);
    }
    const reset=()=>{
        setMillisecondsPassed(0);
        setLaps([]);
    }
    const lap=()=>{ 
        setLaps([...laps,millisecondsPassed]);
    }
    //End OnClick functions

    //Uses secondsPassed and returns it in the format 00:00.00
    //NOTE: timer only increments "millisecondsPassed" every 10 seconds, so only 100 "millisecondsPassed" per second.
    const formatTime= (milliseconds: number) => {
        const totalSecondsPassed=Math.floor(milliseconds/100)
        const minutes=Math.floor(totalSecondsPassed/60);
        const seconds=totalSecondsPassed % 60;

        const paddedMinutes=minutes.toString().padStart(2,"0");
        const paddedSeconds=seconds.toString().padStart(2,"0");
        const paddedMilliseconds=(milliseconds%100).toString().padStart(2,"0");
        return paddedMinutes+":"+paddedSeconds+"."+paddedMilliseconds;
    };  
    return(
        <>
            <div id="stopwatch-container">
                <div id="stopwatch-time">{formatTime(millisecondsPassed)}</div>

                <div id="button-container">  
                    {paused ? <StopWatchButton onButtonClick={reset} text="Reset"/> : <StopWatchButton onButtonClick={lap} text="Lap"/>}
                    {paused ? <StopWatchButton onButtonClick={play} text="Start"/> : <StopWatchButton onButtonClick={pause} text="Stop"/>} 
                </div> 

                
                <ul className="list-group">
                    {laps.map((item,index) => (
                        <li className="list-group-item list-item" key={index}>Lap {index+1}: {formatTime(item)} </li>
                    ))}
                </ul>
            </div> 
        </> 
    )
}