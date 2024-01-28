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
        <div>
            <button onClick={()=> useTimerHandler(!useTimer)}>{useTimer ? "Pause" : "Start"}</button>
            <button onClick={()=> resetHandler()}>Reset</button>
            <button onClick={lapHandler}>Lap</button>
        </div>
    )
}