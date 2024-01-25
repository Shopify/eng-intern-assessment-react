import React from "react";
import { formatTime } from "../utils/FormatTime";

type LapsProps = {
    lapTimes:  number[];
}

export const Laps = ({ lapTimes } : LapsProps) => {

    // Calcualtes the split time between the current time and the previous time
    const calculateSplit = (currTime: number, index: number) => {
        const previousTime = (index === lapTimes.length - 1 ? 0 : lapTimes[index + 1]);
        return currTime - previousTime;
    }

    return (
        <div data-testid="lap-times">
            {lapTimes.length > 0 && (
                <div className="grid-container title">
                    <div>Number</div>
                    <div>Splits</div>
                    <div>Total</div>
                </div>
            )}
            {/*
                For potential optimization, only keep track of most recent lap time/last time the lap button was hit
                and calcualte the split and current lap at that time. Discard older values and only update container
                w/i the new lap time.
            */}
            {lapTimes.map((lap, index) => (
                <div key={index} className="grid-container" >
                    <div>Lap {lapTimes.length - index}</div>
                    <div data-testid="split-time">{formatTime(calculateSplit(lap, index))}</div>
                    <div data-testid="total-time">{formatTime(lap)}</div>
                </div>
            ))}
        </div>
    )
}
