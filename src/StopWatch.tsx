import React from 'react'
import "./stopwatch.css"
import StopWatchButton from './StopWatchButton';
import { useState } from 'react'

export default function StopWatch() {
    const [startTime, setStartTime] = useState();
    const [isPaused, setPaused] = useState(false);

    const handleStart = () => {

    }

    return(
        <div className="stopwatch">
            <div className="stopwatch-screen"></div>

            <StopWatchButton onPress={(e) => console.log("Button pressed!")}></StopWatchButton>

        </div>
    )
}