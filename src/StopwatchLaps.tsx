import React from "react";

// Interface to assign types to the props of the component Laps
interface LapsProps{
    laps: number[];
    lapTimeUnits: string[];
    convertToTimeUnits(time: number): string[];
}

// Component that renders the laps
// Makes use of the map() method applying a function to each element in the laps array to render them
export default function StopwatchLaps({ laps, lapTimeUnits, convertToTimeUnits }: LapsProps){
    return(
        <div id="laps-list" className="laps">
            {laps.map((lap, index) => {
            lapTimeUnits = convertToTimeUnits(lap) // Converts to time units for better display of time
            return(
                <p className="lap-elements">Lap {index+1} &emsp; {lapTimeUnits[0]}:{lapTimeUnits[1]}.{lapTimeUnits[2]}</p>
            )
        })}
        </div>
    )
}