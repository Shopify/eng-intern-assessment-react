import React from 'react'

interface TimerState {
    exists: boolean
    time: number
    isPaused: boolean
}

interface StopWatchButtonProps {
    timerState: TimerState
    onStartClicked: () => void
    onStopClicked: () => void
    onLapClicked: () => void
    onPauseClicked: () => void
}

export default function StopWatchButton({
    timerState,
    onStartClicked,
    onStopClicked,
    onLapClicked,
    onPauseClicked
}: StopWatchButtonProps) {
    return(
        <div>
            {!timerState.exists && <button onClick={onStartClicked}>Start</button>}
            {timerState.exists && <button onClick={onPauseClicked}>{timerState.isPaused ? "Pause" : "Unpause"}</button>}
            {timerState.exists && <button onClick={onStopClicked}>Stop</button>}
            {timerState.exists && <button onClick={onLapClicked}>Lap</button>}
        </div>
    )
}