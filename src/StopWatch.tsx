import React from 'react'

// Interface to assign types of the props of the component StopWatch
interface StopWatchProps{
    timeElapsed: number;
    timeUnits: string[];
    convertToTimeUnits(time: number): string[];
}

// Component that renders the time aspect of the StopWatch
export default function StopWatch({ timeElapsed, timeUnits, convertToTimeUnits }: StopWatchProps) {
    timeUnits = convertToTimeUnits(timeElapsed);
    
    return(
        <div id="stopwatch-time" className="stopwatch">
            {timeUnits[0]}:{timeUnits[1]}.{timeUnits[2]}
        </div>
    )
}