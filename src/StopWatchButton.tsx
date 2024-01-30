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
            <button style={{ //Start or resume stopwatch
                width: '100px',
                height: '50px',
                fontSize: '30px',
                fontFamily: "Times New Roman"
            }} onClick={() => runTimer()} data-testid="start-watch"> Start </button>
            <button style={{ //Pause stopwatch
                width: '100px',
                height: '50px',
                fontSize: '30px',
                fontFamily: "Times New Roman"
            }} onClick={() => pauseTimer()} data-testid="pause-watch"> Pause </button>
            <button style={{ //Reset stopwatch
                width: '100px',
                height: '50px',
                fontSize: '30px',
                fontFamily: "Times New Roman"
            }} onClick={() => resetTimer()} data-testid="restart-watch"> Reset </button>
        </div>
    )
}