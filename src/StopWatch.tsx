import React, { useState, useEffect} from 'react'
import './Stopwatch.css'

export default function StopWatch() {
    const [timer, setTimer] = useState("00:00:00");
    // Split timer string into individual characters
    const timer_chars = timer.split("");
    
    return(
        <div className = "stopwatch">
            {/* <p>{timer}</p> */}
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