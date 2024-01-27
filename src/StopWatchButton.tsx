import React, { useState, useEffect } from 'react'

interface timerProps {
    setRun: Function;
    setSeconds: Function;
    setMinutes: Function;
    setHours: Function;
}

export default function StopWatchButton(props:timerProps) {
    const setRun = props.setRun
    const setSeconds = props.setSeconds
    const setMinutes = props.setMinutes
   const setHours = props.setHours

    const startButton = () => {
        setRun(true);
    }

    const stopButton = () => {
        setRun(false);
    }

    const resetButton = () => {
        setRun(false);
        setSeconds(0)
        setMinutes(0)
        setHours(0)
        //reset laps to empty
        
    }

    const lapButton = () => {
        //lap function
    }


    return(
        <div>
            <button onClick={startButton}> start </button> 
                <button onClick={stopButton}> stop </button> 
                <button onClick={lapButton}> lap </button> 
                <button onClick={resetButton}> reset </button> 
        </div>
    )
}