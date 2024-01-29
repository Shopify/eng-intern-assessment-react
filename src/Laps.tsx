import React from "react";
import {getFormattedTime, getMilliseconds} from "./timelib";

interface ILapsProps{
    laps: number[]
}
export function Laps(props:ILapsProps){
    const {laps} = props;

    const lapsItems = laps.map((lap,i,lapsArr)=> {
            return (
                <div key={lap} className={`flex flex-row place-content-between`}>
                    <div>Lap {i+1}</div>
                    <div>{getFormattedTime(lap)}.{getMilliseconds(lap)}</div>
                </div>
            )
        }
    )

    return(
        <div className={`flex flex-col-reverse w-[300px]`}>{lapsItems}</div>
    )
}