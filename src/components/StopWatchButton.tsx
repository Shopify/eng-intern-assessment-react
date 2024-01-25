import React from 'react'

interface StopWatchButtonProps {
    startStopWatch: () => void;
    stopOrResetStopWatch: (reset: boolean) => void;
}

export default function StopWatchButton( {startStopWatch, stopOrResetStopWatch} : StopWatchButtonProps) {
    return(
        <div className="row text-center mt-3">
            <div className="col-3">
                <button type="button" className="btn btn-dark" onClick={startStopWatch}>Start</button>
            </div>
            <div className="col-3">
                <button type="button" className="btn btn-dark" onClick={() => {stopOrResetStopWatch(false);}}>Stop</button>
            </div>
            <div className="col-3">
                <button type="button" className="btn btn-dark" onClick={() => {stopOrResetStopWatch(true);}}>Reset</button>
            </div>
            <div className="col-3">
                <button type="button" className="btn btn-dark">Lap</button>
            </div>
        </div>
    )
}