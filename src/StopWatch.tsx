import React, { useEffect, useState } from 'react'

interface StopWatchProps{
    timeElapsed: number;
    timeUnits: string[];
    convertToTimeUnits(time: number): string[];
}

export default function StopWatch({ timeElapsed, timeUnits, convertToTimeUnits }: StopWatchProps) {

    timeUnits = convertToTimeUnits(timeElapsed);
    return(
        <div>
            {timeUnits[0]}:{timeUnits[1]}.{timeUnits[2]}
        </div>
    )
}