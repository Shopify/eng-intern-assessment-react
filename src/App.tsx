import React, { useState, useEffect, useRef } from 'react';
import StopWatchButton from './StopWatchButton'
import StopWatch from './StopWatch';
import formatTime from '../utils/FormatTime';

export default function App() {
    // This is the main component that renders the stopwatch and handles its functionality

    // =========================== STATE VARIABLES ===================================
    const [isRunning, setIsRunning] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [laps, setLaps] = useState<number[]>([]);


    // ============================= RUNNING THE STOPWATCH =================================
    useEffect(() => {
        let timer: ReturnType<typeof setInterval> | undefined;

        if(isRunning) { // update timer ++10ms every 10ms
            timer = setInterval (() => {
                setTimeElapsed(prevTime => prevTime + 10);
            }, 10);
        }

        return () => { // cleanup function when isRunning or time changes
            if (timer) {
                clearInterval(timer);
            }
        }
    }, [isRunning])


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
        setLaps([]);
    }
    const handleLap = () => {
        setLaps([...laps, timeElapsed]) // add timeElapsed to the list of laps
    }


    // ========================== LAPS LIST =============================
    const LapsList = () => {
        
        // Finds the time between laps and formats the time in ms to HH:MM:SS.CS
        const formatLap = (lap:number) => {
            const currentIndex = laps.indexOf(lap)
            if (currentIndex === 0){
                return (formatTime(lap))
            } else {
                const previousLap = laps[currentIndex-1]
                return (formatTime(lap-previousLap))
            }
        }

        // ------------ Rendering LapsList: -------------------
        return(
            <div id='laps-list' data-testid='laps-list' >
                {laps.map((lap, index) => (
                    <li key={index}>Lap #{index + 1} - {formatLap(lap)}</li>
                ))}
            </div>
        )
    }


    // ============================= RENDERING APP.TSX =================================
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
                <LapsList />
            </div>
        </div>
    )
}