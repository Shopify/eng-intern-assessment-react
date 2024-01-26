import React from 'react'
import './StopWatchButton.scss'

type StopWatchButtonProps = {
    timerOn: boolean
    handleToggleTimer: () => void
    handleLapResetClick: () => void
}

export default function StopWatchButton({ timerOn, handleToggleTimer, handleLapResetClick }: StopWatchButtonProps) {



    return (
        <div className='button__container'>
            <button className='button' onClick={() => handleToggleTimer()}>{timerOn === false ? "Start" : "Stop"}</button>
            <button className='button' onClick={() => handleLapResetClick()}>{timerOn === false ? "Reset" : "Lap"}</button>
        </div>
    )
}