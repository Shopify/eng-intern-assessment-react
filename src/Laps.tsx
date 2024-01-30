import React from "react";
import {getFormattedTime, getMilliseconds} from "./timelib";

interface ILapsProps{
    laps: number[]
}
export function Laps(props: ILapsProps) {
    const { laps } = props;

    return (
        <ol className={`flex flex-col-reverse w-[300px]`}>
            {laps.map((lap, i) => (
                <li key={`lap-${i}`} className={`flex flex-row justify-between`}>
                    <span>Lap {i + 1}</span>
                    <span aria-label={`Time for Lap ${i + 1}: `}>
                        {getFormattedTime(lap)}.{getMilliseconds(lap)}
                    </span>
                </li>
            ))}
        </ol>
    );
}