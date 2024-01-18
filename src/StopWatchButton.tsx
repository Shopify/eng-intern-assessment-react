import React from 'react'
import type { StopwatchState } from './App'

type Controls = {
    runFunc: () => void, 
    pauseFunc: () => void, 
    resetFunc: () => void,
    lapFunc: () => void, 
}

type Props = {
    controls: Controls,
    stopwatchState: StopwatchState
}

export default function StopWatchButton({  controls, stopwatchState  }: Props) {
    const buttonStyle: React.CSSProperties = {
        padding: '2rem',
        margin: '1rem',
        width: '16rem',
        alignContent: 'center',
        fontSize: '3rem',
        fontWeight: 'bold',
        backgroundColor: 'black',
        color: 'white', 
        borderStyle: 'none',
        borderRadius: '1rem'
    }

    return(
        <div>
            <div>
                {/* display "start" and "reset" when not running, "lap" and "pause" when running*/}
                {/* onClick, trigger respective functions defined in App.tsx */}

                {stopwatchState == "running" 
                ? <button onClick={controls.lapFunc} style={buttonStyle} data-testid="lap-button">Lap</button>
                : <button onClick={controls.runFunc} style={buttonStyle} data-testid="start-button">Start</button>
                }
                
                {stopwatchState == "running" 
                ? <button onClick={controls.pauseFunc} style={buttonStyle} data-testid="pause-button">Pause</button>
                : <button onClick={controls.resetFunc} style={buttonStyle} data-testid="reset-button">Reset</button>
                }
            </div>
        </div>
    )
}
