import React from 'react'
import StopWatchButton from './StopWatchButton'
import { formatTime } from '../utils/FormatTime';
import { Laps } from './Laps';
import { useStopWatch } from '../hooks/useStopWatch';

export default function StopWatch() {
    const { time, isRunning, lapTimes, handleStartStop, handleReset, handleLap } = useStopWatch();

    return(
        <div>
            <div id={"time"}>{formatTime(time)}</div>
            <StopWatchButton onClick={handleStartStop} label={isRunning ? "Stop" : "Start"}/>
            <StopWatchButton onClick={handleReset} label={"Reset"}/>
            <StopWatchButton onClick={handleLap} label={"Lap"}/>
            <Laps lapTimes={lapTimes} />
        </div>
    )
}
