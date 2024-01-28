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
                    <li key={index}
                        className='text-[1.3rem]'
                    >
                        <span className='font-semibold'>
                        Lap #{index + 1}{' '}
                        </span>
                        - {formatLap(lap)}
                    </li>
                ))}
            </div>
        )
    }


    // ============================= RENDERING APP.TSX =================================
    return(
        <div id='page-container'
        className={`w-screen h-screen flex flex-col items-center justify-center ${
            isRunning ? 'bg-[#5b5b85]' : 'bg-[#96BF48]'
        }`}
        >
            {/* ============  MAIN CONTAINER ============= */}
            <div id='main-container'
            className='w-full h-full flex flex-col items-center justify-center -translate-y-3'
            >
                {/* ======== HEADER SECTION ========= */}
                <div id='header-container' className='text-center'>
                    <h1 id='stopify-header' className='font-bold text-[5.7rem] italic'>
                        stopify
                    </h1>
                    <p id='subheader' className='text-[1.7rem] font-extralight -translate-y-2'>
                        Shopify Stopwatch
                    </p>
                </div>

                {/* ======= STOPWATCH DISPLAY ====== */}
                <div id='stopwatch-display-container'>
                    <StopWatch timeElapsed={timeElapsed} isRunning={isRunning}/>
                </div>

                {/* ======= STOPWATCH BUTTONS ======== */}
                <div id='stopwatch-buttons-container' className='mb-4'>
                    <StopWatchButton
                        handleStart={handleStart}
                        handleStop={handleStop}
                        handleReset={handleReset}
                        handleLap={handleLap}
                        isRunning={isRunning}
                    />
                </div>

                {/* ====== LAPS LIST ======= */}
                <div id='laps-container'
                    className='w-[31rem] min-h-[5.5rem] max-h-[5.5rem] border-[0.18rem] border-black 
                    rounded-3xl py-2 overflow-auto text-center'>
                    <LapsList />
                </div>
            </div>


            {/* ====== FOOTER ======= */}
            <div id='footer-container' className='absolute bottom-0 w-full text-sm text-center'>
                <p id='footer'>Shopify Frontend Internship React Assessment by Claire Peng</p>
            </div>
        </div>
    )
}