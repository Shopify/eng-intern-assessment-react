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
            <div id='laps-list' data-testid='laps-list' 
            >
                {laps.map((lap, index) => (
                    <li key={index}>Lap #{index + 1} - {formatLap(lap)}</li>
                ))}
            </div>
        )
    }


    // ============================= RENDERING APP.TSX =================================
    return(
        <div id='page-container'
            className='bg-[#96BF48] w-screen h-screen flex flex-col justify-center items-center text-center'
        >
            <div id='header-container' className='mb-3'>
                <h1 id='stopify-header' className='font-bold text-[7rem] italic'>
                    stopify
                </h1>
                <p id='subheader' className='text-4xl font-light'>
                    Shopify Stopwatch
                </p>
            </div>

            <div id='stopwatch-display-container' 
                className='bg-black text-white rounded-full 
                w-[36rem] h-[36rem] flex flex-col justify-center items-center
                mt-8 mb-6
                '>
                <StopWatch timeElapsed={timeElapsed}/>
            </div>

            <div id='stopwatch-buttons-container'
                className='mb-6'
            >
                <StopWatchButton
                    handleStart={handleStart}
                    handleStop={handleStop}
                    handleReset={handleReset}
                    handleLap={handleLap}
                    isRunning={isRunning}
                />
            </div>

            <div id='laps-container'
            className='w-[37rem] min-h-[6rem] border-[0.2rem] border-black rounded-3xl '
            >
                <LapsList />
            </div>

            <div id='footer-container'>
                <p id='footer'>Shopify React Assessment by Claire Peng</p>
            </div>
        </div>
    )
}