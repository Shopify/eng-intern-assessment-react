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
                    <h1 id='stopify-header' className='font-bold text-[6rem] italic'>
                        stopify
                    </h1>
                    <p id='subheader' className='text-3xl font-extralight'>
                        Shopify Stopwatch
                    </p>
                </div>

                {/* ======= STOPWATCH DISPLAY ====== */}
                <div id='stopwatch-display-container' 
                    className='bg-black text-white rounded-full shadow-black/40 shadow-lg
                    w-[28rem] h-[28rem] min-h-[14rem] flex flex-col justify-center items-center
                    mt-6 mb-7 transition-transform duration-300 transform-gpu hover:scale-105
                    relative'>
                    
                    {/* TIME ELAPSED */}
                    <StopWatch timeElapsed={timeElapsed}/>

                    {/* PAUSED LABEL -- when stopwatch has been run and stopped */}
                    {!isRunning && timeElapsed > 0 &&
                        <p id='paused-label'
                        className='text-xl absolute translate-y-[5rem]'>
                            Paused
                        </p>
                    }
                </div>

                {/* ======= STOPWATCH BUTTONS ======== */}
                <div id='stopwatch-buttons-container'
                    className='mb-4'
                >
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
                className='w-[31rem] min-h-[5.5rem] max-h-[5.5rem] border-[0.2rem] border-black rounded-3xl py-2 overflow-auto text-center'
                >
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