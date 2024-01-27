import React, { useState, useEffect, useRef } from 'react';
import StopWatchButton from './StopWatchButton'

export default function App() {
    // This is the main component that renders the stopwatch and handles its functionality

    // =========================== STATE VARIABLES ===================================
    const [isRunning, setIsRunning] = useState(false);


    // ============================= BUTTON FUNCTIONS =================================
    const handleStart = () => {
        setIsRunning(true);
    }
    const handleStop = () => {
        setIsRunning(false);
    }
    const handleReset = () => {
        setIsRunning(false);
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
                <h2 id='subheader'>
                    Shopify Stopwatch
                </h2>
            </div>

            <div id='stopwatch-display-container'>
                STOPWATCH DISPLAY
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