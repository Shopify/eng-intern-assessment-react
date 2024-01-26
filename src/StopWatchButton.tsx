import React, { useState, useEffect } from 'react'

export default function StopWatchButton() {

    const startButton = () => {
        //setRun(true);
    }

    const stopButton = () => {
        //setRun(false);
    }

    const resetButton = () => {
        /*
        setRun(false);
        reset sec, min, hrs to 0
        reset laps to empty
        */
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