import React from 'react'
import {Simulate} from "react-dom/test-utils";
import keyPress = Simulate.keyPress;

interface IStopWatchButtonProps{
    useTimer: boolean,
    useTimerHandler: (param:boolean) => void,
    resetHandler: () => void,
    lapHandler: () => void
    lapsEmpty: boolean
}
export default function StopWatchButton(props:IStopWatchButtonProps) {
    const {useTimer, useTimerHandler, resetHandler, lapHandler, lapsEmpty} = props;
    return(
        <div className={"flex flex-row justify-center gap-6 w-[300px]"}>
            <button className={"p-2 border-2 rounded-md"} onClick={()=> {
                useTimerHandler(!useTimer);
            }}>{useTimer ? "Pause" : "Start"}</button>
            <button className={"p-2 border-2 rounded-md"} onClick={()=> resetHandler()}>Reset</button>
            <button className={"p-2 border-2 rounded-md"} onClick={lapHandler} disabled={!useTimer}>Lap</button>
        </div>
    )
}