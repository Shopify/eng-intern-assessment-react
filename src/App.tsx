import React, { useState } from "react";
import StopWatch from "./StopWatch";
import StopWatchButton from "./StopWatchButton";

export enum TimerState {
    RUNNING = "running",
    PAUSED = "paused",
    RESETTING = "resetting",
}

export default function App() {
    const [timerState, setTimerState] = useState<TimerState>(TimerState.PAUSED);
    return (
        <div>
            <StopWatch timerState={timerState} />
            <StopWatchButton
                timerState={timerState}
                setTimerState={setTimerState}
            />
        </div>
    );
}
