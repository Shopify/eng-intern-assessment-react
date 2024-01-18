import React, { useState } from 'react'
import './Stopwatch.css'

type StopWatchProps = {
    timer: string;
};

export default function StopWatch({ timer }: StopWatchProps) {
    // Split timer string into individual characters
    const timer_chars = timer.split("");
    
    return(
        <div className = "stopwatch">
            <div className="digit">{timer_chars[0]}</div>
            <div className="digit">{timer_chars[1]}</div>
            <div className="colon">:</div>
            <div className="digit">{timer_chars[3]}</div>
            <div className="digit">{timer_chars[4]}</div>
            <div className="colon">:</div>
            <div className="digit">{timer_chars[6]}</div>
            <div className="digit">{timer_chars[7]}</div>
        </div>
    )
}