import React, { Dispatch, SetStateAction } from 'react'

interface TimerState{
    timer: string,
    runTimer: () => void,
    pauseTimer: () => void,
    resetTimer: () => void,
}

export default function StopWatchButton({ timer, runTimer, pauseTimer, resetTimer}: TimerState) {
    return(
        <div style={{
            display: 'flex',
            textAlign: 'center',
            gap: "10px"
        }}>
            <button style={{
                width: '100px',
                height: '50px',
                fontSize: '30px',
                fontFamily: "Times New Roman"
            }} onClick={() => runTimer()}> Start </button>
            <button style={{
                width: '100px',
                height: '50px',
                fontSize: '30px',
                fontFamily: "Times New Roman"
            }} onClick={() => pauseTimer()}> Pause </button>
            <button style={{
                width: '100px',
                height: '50px',
                fontSize: '30px',
                fontFamily: "Times New Roman"
            }} onClick={() => resetTimer()}> Reset </button>
        </div>
    )
}