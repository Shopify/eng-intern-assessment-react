import React from "react";
import { convertToTimeUnits } from "./App";

// Interface to assign types to the props of the component Laps
interface LapsProps{
    laps: number[];
}

// Component that renders the laps
// Makes use of the map() method applying a function to each element in the laps array to render them
export default function StopwatchLaps({ laps }: LapsProps){
    let lapTimeUnits: string[];
    return(
        <div id="laps-list" className="laps">
            {laps.map((lap, index) => {
            lapTimeUnits = convertToTimeUnits(lap)
            return(<p className="lap-elements" key={index} data-testid="lap-items">Lap {index+1} &emsp; {lapTimeUnits[0]}:{lapTimeUnits[1]}.{lapTimeUnits[2]}</p>)
        })}
        </div>
    )
}