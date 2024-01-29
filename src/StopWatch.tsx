import React, {useMemo} from 'react'
import {getFormattedTime, getMilliseconds} from "./timelib";

interface IStopWatchProps{
    time:number
}
export default function StopWatch(props:IStopWatchProps) {
    const {time} = props;
    const formattedTime = useMemo<string>(()=>getFormattedTime(time),[time]);
    const ms = useMemo<string>(()=>getMilliseconds(time),[time]);
    return(
        <div className={`text-6xl w-[9ch] flex justify-center`}>
            <div className={`text-left flex flex-row align-text-bottom`}>
                <div className={`w-[245px]`}>{formattedTime}</div>
                <div className={`text-base w-[1ch]`}>{ms}</div>
            </div>
        </div>
    )
}