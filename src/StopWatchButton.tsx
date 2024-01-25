import React from 'react'

type StopWatchButtonProps = {
    timerOn: boolean
    handleToggleTimer: () => void
    handleLapResetClick: () => void
}

export default function StopWatchButton({ timerOn, handleToggleTimer, handleLapResetClick }: StopWatchButtonProps) {



    return (
        <div>
            <button onClick={() => handleToggleTimer()}>{timerOn === false ? "Start" : "Stop"}</button>
            <button onClick={() => handleLapResetClick()}>{timerOn === false ? "Reset" : "Lap"}</button>
        </div>
    )
}