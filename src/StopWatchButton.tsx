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
    return(
        <div>
            <div>
                <button onClick={controls.runFunc} data-testid="start-button">Start</button>
                {state == "running" 
                ? <button onClick={controls.pauseFunc} data-testid="pause-button">Pause</button>
                : <button onClick={controls.resetFunc} data-testid="reset-button">Reset</button>
                }
                
            </div>
        </div>
    )
}
