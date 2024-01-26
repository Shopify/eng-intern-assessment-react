import React, { useState, useEffect, useRef } from 'react';

type ButtonProps = {
    startWatch: () => void;
    stopWatch: () => void;
    resetStopwatch: () => void;
    recordLap: () => void;
};

export default function StopWatchButton({startWatch, stopWatch, resetStopwatch, recordLap}: ButtonProps) {
    return(
        <div>
            <div className="button-container">
            <button className="button" onClick={startWatch}>
                Start
            </button>
            <button className="button" onClick={stopWatch}>
                Stop
            </button>
            <button className="button" onClick={resetStopwatch}>
                Reset
            </button>
            <button className="button" onClick={recordLap}>
                Lap
            </button>
            </div>
        </div>
    )
}