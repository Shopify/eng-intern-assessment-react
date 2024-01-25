import React, { useState, useEffect } from 'react';
import './App.css';
import StopWatchButton from './StopWatchButton';

export default function StopWatch() {
    const [secondsPassed,setSecondsPassed]=useState(0); 

    useEffect(()=>{
        const interval=setInterval(()=>{
            setSecondsPassed(prevSeconds=>prevSeconds+1); 
        }, 1000);  

        return () => clearInterval(interval);
    }) 
    const formatTime= () => {
        const minutes=Math.floor(secondsPassed/60);
        const seconds=Math.floor(secondsPassed%60);

        const paddedMinutes=minutes.toString().padStart(2,"0");
        const paddedSeconds=seconds.toString().padStart(2,"0");
        return paddedMinutes+":"+paddedSeconds;
    };  
    return(
        <>
            <div className="stopwatch-body">{formatTime()}</div>
            <div className="button-container">
                <StopWatchButton text="Reset"/> 
                <StopWatchButton text="Start"/> 
            </div> 
        </> 
    )
}