import React, { useState } from 'react'
import './Stopwatch.css'

type StopWatchProps = {
    timer: string;
};

export default function StopWatch({ timer }: StopWatchProps) {
    // Split timer string into individual characters
    const [hours, minutes, secondsMs] = timer.split(":");
    const [seconds, milliseconds] = secondsMs.split(".");
    
    return(
        <div className="stopwatch">
            {/* Hours */}
            <div className="digit">{hours[0]}</div>
            <div className="digit">{hours[1]}</div>
            <div className="colon">:</div>

            {/* Minutes */}
            <div className="digit">{minutes[0]}</div>
            <div className="digit">{minutes[1]}</div>
            <div className="colon">:</div>

            {/* Seconds */}
            <div className="digit">{seconds[0]}</div>
            <div className="digit">{seconds[1]}</div>
            <div className="dot">.</div>

            {/* Milliseconds */}
            <div className="digit">{milliseconds[0]}</div>
            <div className="digit">{milliseconds[1]}</div>
            <div className="digit">{milliseconds[2]}</div>
        </div>
        
    )
}