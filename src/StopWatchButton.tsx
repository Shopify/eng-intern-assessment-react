import React from 'react'

type StopWatchButtonProps = {
    timerOn: boolean
    handleStartTimer: () => void
    handleLapResetClick: () => void
}

export default function StopWatchButton({ timerOn, handleStartTimer, handleLapResetClick }: StopWatchButtonProps) {



    return (
        <div>
            <button onClick={() => handleStartTimer()}>{timerOn === false ? "Start" : "Stop"}</button>
            <button onClick={() => handleLapResetClick()}>{timerOn === false ? "Reset" : "Lap"}</button>
        </div>
    )
}