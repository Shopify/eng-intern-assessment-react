import React from "react";
import {getFormattedTime} from "./timelib";

interface ILapsProps{
    laps: number[]
}
export function Laps(props:ILapsProps){
    const {laps} = props;

    const lapsItems = laps.map((lap,i,lapsArr)=> {
            return (
                <div key={lap}>
                    <div>{getFormattedTime(lap)}</div>
                </div>
            )
        }
    )

    return(
        <div>{lapsItems}</div>
    )
}