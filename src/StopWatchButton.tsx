import React from 'react'

interface IStopWatchButtonProps{
    useTimer: boolean,
    useTimerHandler: (param:boolean) => void,
    resetHandler: () => void,
    lapHandler: () => void
}
export default function StopWatchButton(props:IStopWatchButtonProps) {
    const {useTimer, useTimerHandler, resetHandler, lapHandler} = props;
    return(
        <div className={"flex flex-row gap-4"}>
            <button className={"p-2 border-2 rounded-md"} onClick={()=> {
                useTimerHandler(!useTimer);
            }}>{useTimer ? "Pause" : "Start"}</button>
            <button className={"p-2 border-2 rounded-md"} onClick={()=> resetHandler()}>Reset</button>
            <button className={"p-2 border-2 rounded-md"} onClick={lapHandler}>Lap</button>
        </div>
    )
}