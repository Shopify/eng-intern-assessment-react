import React from "react";

interface LapsProps{
    laps: number[];
    lapTimeUnits: string[];
    convertToTimeUnits(time: number): string[];
}
export default function Laps({ laps, lapTimeUnits, convertToTimeUnits }: LapsProps){
    return(
        <div>
            {laps.map((lap, index) => {
            lapTimeUnits = convertToTimeUnits(lap)
            return(
                <p>Lap {index+1} | &emsp; {lapTimeUnits[0]}:{lapTimeUnits[1]}.{lapTimeUnits[2]}</p>
            )
        })}
        </div>
    )
}