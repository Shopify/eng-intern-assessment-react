import React, { useEffect, useState, useRef } from 'react';
import { formatBigTime } from './utils/timeUtils'; // Utility for time formatting
import { exportLapsToCSV } from './utils/csvExport';
import useStopwatch from './hooks/useStopwatch'; // Custom hook for stopwatch logic
import useMiniStopwatch from './hooks/useMiniStopWatch';
import backgroundImage from './shopify-logo-png-transparent.png'; // Background image


// Stopwatch component definition
const Stopwatch = () => {

    
    // Extracting state and functions from the useStopwatch hook
    const { time, lapTime, isRunning, laps, milliseconds, start, stop, lap, reset } = useStopwatch();
    const { miniTime, startMini, stopMini, resetMini } = useMiniStopwatch();

    const pathRef = useRef(null);
    const textRef = useRef(null);
    const circleRef = useRef(null);


    useEffect(() => {
        if (pathRef.current && textRef.current) {
            const pathLength = pathRef.current.getTotalLength();
            pathRef.current.style.strokeDasharray = `${pathLength}`;

            const updateTextPosition = () => {

                if (miniTime >= 6000) {
                    resetMini()
                    startMini();
                }

                const elapsedTimeInCurrentMinute = miniTime % 36000; // 60000 milliseconds in a minute
                const proportion = elapsedTimeInCurrentMinute / 6000;
                const pathPoint = pathRef.current.getPointAtLength(pathLength * proportion);

                textRef.current.setAttribute("x", pathPoint.x);
                textRef.current.setAttribute("y", pathPoint.y);
                textRef.current.textContent = Math.floor(elapsedTimeInCurrentMinute / 100);

                circleRef.current.setAttribute("cx", pathPoint.x);
                circleRef.current.setAttribute("cy", pathPoint.y);
            };

            // Update text position based on elapsed time
            updateTextPosition();
        }
    }, [time, isRunning]);
    
    // Conditional class name based on laps
    const containerClass = laps.length > 0 ? "stopwatch-container stopwatch-container--laps-added" : "stopwatch-container";

    // Inline style for background image
    const backgroundStyle: React.CSSProperties = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        opacity: 0.2, // Semi-transparent background
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1, // Behind other content
    };

    return (
        <div className="stopwatch-page">
            {/* Background image */}
            <div style={backgroundStyle} />
            {/* SVG Overlay Container */}
            <div className="flex-container">

            <div className={containerClass}>
                {/* Stopwatch display */}
                <div className="stopwatch-display">
                    {/* Main Timer and Milliseconds */}
                    <div className="timer-display">
                        <h1>{formatBigTime(time)}s <span className="milliseconds-display">{milliseconds}</span></h1>
                    </div>

                    {/* Lap Timer */}
                    {laps.length > 0 && (
                        <div className="lap-time-display">
                            <h2>{formatBigTime(lapTime)}</h2>

                        </div>
                    )}
                </div>

                

                {/* Control Buttons */}
                <div className="button-container">
                    <button className="start-button" onClick={() => { start(); startMini(); }} disabled={isRunning}>Start</button>
                    <button className="stop-button" onClick={() => { stop(); stopMini(); }} disabled={!isRunning}>Stop</button>
                    <button className="reset-button" onClick={() => { reset(); resetMini(); }}>Reset</button>

                    <button className="lap-button" onClick={lap} disabled={!isRunning}>Lap</button>
                </div>
            </div>
                <div className="svg-overlay-container">
                    <img src={backgroundImage} alt="Shopify Logo" className="shopify-logo-image" />
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="1 -4.88889 18 19.89" className="shopify-logo-svg">
                    <path
                        ref={pathRef}
                        d="M 2 2 L 1 12 L 12 14 L 19 13 L 17 -1 L 15 -1 C 13 -2 12 -3 12 -3 L 11 -4 C 10 -4 10 -4 10 -4 C 10 -5 9 -4 8 -4 C 6 -3 6 -2 5 0 L 5 0 L 3 1"
                        fill="none"
                        stroke="none"
                    />
                    <circle ref={circleRef} r="1" fill="black" />
                    <text ref={textRef} alignmentBaseline="middle">
                        {formatBigTime(miniTime)}
                    </text>
                </svg>
                </div>
            </div>

            
            {laps.length > 0 && (<button onClick={() => exportLapsToCSV(laps)}>Export Laps</button>)}
            {/* Laps List */}
            {laps.length > 0 && (
                <div className="laps-container">
                    
                    <ul>
                        {laps.map((lapTime, index) => (
                            <li key={index}>Lap {index + 1}: {formatBigTime(lapTime)}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Stopwatch;
