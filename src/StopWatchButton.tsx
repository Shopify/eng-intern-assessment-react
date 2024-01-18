import React from 'react'
import type { StopwatchState } from './App'

type Controls = {
    runFunc: () => void, 
    pauseFunc: () => void, 
    resetFunc: () => void,
}

type Props = {
    controls: Controls,
    state: StopwatchState
}

export default function StopWatchButton({ controls, state  }: Props) {
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
                <button onClick={controls.runFunc} style={buttonStyle} data-testid="start-button">Start</button>
                {state == "running" 
                ? <button onClick={controls.pauseFunc} style={buttonStyle} data-testid="pause-button">Pause</button>
                : <button onClick={controls.resetFunc} style={buttonStyle} data-testid="reset-button">Reset</button>
                }
            </div>
        </div>
    )
}
