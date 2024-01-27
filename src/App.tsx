import React, { useState, useEffect, useRef } from 'react';
import StopWatchButton from './StopWatchButton'
import StopWatch from './StopWatch';

export default function App() {
    // This is the main component that renders the stopwatch and handles its functionality

    // =========================== STATE VARIABLES ===================================
    const [isRunning, setIsRunning] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);


    // ============================= BUTTON FUNCTIONS =================================
    const handleStart = () => {
        setIsRunning(true);
    }
    const handleStop = () => {
        setIsRunning(false);
    }
    const handleReset = () => {
        setIsRunning(false);
        setTimeElapsed(0);
        console.log("Reset!")
    }
    const handleLap = () => {
        console.log("Lap!")
    }


    // ============================= RENDERING =================================
    return(
        <div>
            <div id='header-container'>
                <h1 id='stopify-header'>
                    Stopify
                </h1>
                <p id='subheader'>
                    Shopify Stopwatch
                </p>
            </div>

            <div id='stopwatch-display-container'>
                <StopWatch timeElapsed={timeElapsed}/>
            </div>

            <div id='stopwatch-buttons-container'>
                <StopWatchButton
                    handleStart={handleStart}
                    handleStop={handleStop}
                    handleReset={handleReset}
                    handleLap={handleLap}
                    isRunning={isRunning}
                />
            </div>

            <div id='laps-container'>
                LAPS
            </div>


        </div>
    )
}