import React, {useMemo} from 'react'
import {getFormattedTime} from "./timelib";

interface IStopWatchProps{
    time:number
}
export default function StopWatch(props:IStopWatchProps) {
    const {time} = props;
    const formattedTime = useMemo<string>(()=>getFormattedTime(time),[time]);
    return(
        <div>{{formattedTime}}</div>
    )
}