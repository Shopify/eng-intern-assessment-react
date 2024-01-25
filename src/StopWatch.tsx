import React, { useState, useEffect } from 'react';
import './App.css';
import StopWatchButton from './StopWatchButton';

//Component that handles all stopwatch functionality
export default function StopWatch() {
    const [millisecondsPassed,setMillisecondsPassed]=useState(0); 
    const [paused, setPaused]=useState(true)

    //useEffect hook that sets up a timer to increment secondsPassed state every second.
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
    const play=()=>{
        setPaused(false);
    }
    const pause=()=>{
        setPaused(true);
    }
    const reset=()=>{
        console.log("REseetting!");
    }
    const lap=()=>{
        console.log("lapped!");
    }

    //Uses secondsPassed and returns it in the format 00:00.00
    //NOTE: timer only increments "millisecondsPassed" every 10 seconds, so only 100 "millisecondsPassed" per second.
    const formatTime= () => {
        const totalSecondsPassed=Math.floor(millisecondsPassed/100)
        const minutes=Math.floor(totalSecondsPassed/60);
        const seconds=totalSecondsPassed % 60;

        const paddedMinutes=minutes.toString().padStart(2,"0");
        const paddedSeconds=seconds.toString().padStart(2,"0");
        const paddedMilliseconds=(millisecondsPassed%100).toString().padStart(2,"0");
        return paddedMinutes+":"+paddedSeconds+"."+paddedMilliseconds;
    };  
    return(
        <>
            <div className="stopwatch-body">{formatTime()}</div>
            <div className="button-container"> 
                 
                {paused ? <StopWatchButton onButtonClick={reset} text="Reset"/> : <StopWatchButton onButtonClick={lap} text="Lap"/>}
                {paused ? <StopWatchButton onButtonClick={play} text="Start"/> : <StopWatchButton onButtonClick={pause} text="Stop"/>}
 
            </div> 
        </> 
    )
}