import React from 'react'

type StopWatchButtonProps = {
    timerOn: boolean
    handleStartTimer: () => void
}

export default function StopWatchButton({ timerOn, handleStartTimer }: StopWatchButtonProps) {



    return (
        <div>
            <button onClick={() => handleStartTimer()}>{timerOn === false ? "Start" : "Stop"}</button>
            <button>{timerOn === false ? "Reset" : "Lap"}</button>
        </div>
    )
}