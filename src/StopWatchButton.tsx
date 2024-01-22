import React, { Dispatch, SetStateAction } from 'react'

interface TimerState{
    timer: string,
    runTimer: () => void,
    pauseTimer: () => void,
    resetTimer: () => void,
}

export default function StopWatchButton({ timer, runTimer, pauseTimer, resetTimer}: TimerState) {
    return(
        <div>
            <button style={{
                background: 'none'
            }} onClick={() => runTimer()}> Start </button>
            <button style={{
                background: 'none'
            }} onClick={() => pauseTimer()}> Pause </button>
            <button style={{
                background: 'none'
            }} onClick={() => resetTimer()}> Reset </button>
        </div>
    )
}