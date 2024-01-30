import React from 'react'
import { convertToTimeUnits } from './App';

// Interface to assign types of the props of the component StopWatch
interface StopWatchProps{
    timeElapsed: number;
}

// Component that renders the time aspect of the StopWatch
export default function StopWatch({ timeElapsed }: StopWatchProps) {
    let timeUnits: string[];
    timeUnits = convertToTimeUnits(timeElapsed);
    
    return(
        <div data-testid="time-display" id="stopwatch-time" className="stopwatch">
            {timeUnits[0]}:{timeUnits[1]}.{timeUnits[2]}
        </div>
    )
}