import React, { useState } from "react";
import StopWatch from "./StopWatch";
import StopWatchButton from "./StopWatchButton";
import "./styles.css";

export enum TimerState {
    RUNNING = "running",
    PAUSED = "paused",
    RESETTING = "resetting",
}

export default function App() {
    const [timerState, setTimerState] = useState<TimerState>(TimerState.PAUSED);
    const [lapSignal, setLapSignal] = useState(false);
    // could have hoisted time state to App level, but decided to keep time bound to the stopwatch component
    // the solutions have either a performance or complexity limitation. I decided to opt for performance > complexity
    return (
        <div className="main-wrapper">
            <StopWatchButton
                timerState={timerState}
                setTimerState={setTimerState}
                setLapSignal={setLapSignal}
            />
            <StopWatch
                timerState={timerState}
                lapSignal={lapSignal}
                setLapSignal={setLapSignal}
            />
        </div>
    );
}
