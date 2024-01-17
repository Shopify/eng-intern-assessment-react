import React from "react";
import { TimerState } from "./App";

export default function StopWatchButton({
    timerState,
    setTimerState,
}: {
    timerState: TimerState;
    setTimerState: (timerState: TimerState) => void;
}) {
    return (
        <div>
            <button
                onClick={() => {
                    if (timerState === TimerState.RUNNING) {
                        setTimerState(TimerState.PAUSED);
                    } else if (
                        [TimerState.PAUSED, TimerState.RESETTING].includes(
                            timerState
                        )
                    ) {
                        setTimerState(TimerState.RUNNING);
                    }
                }}
                name={timerState === TimerState.RUNNING ? "Pause" : "Play"}
            >
                {timerState === TimerState.RUNNING ? "Pause" : "Play"}
            </button>
            <button
                onClick={() => {
                    setTimerState(TimerState.RESETTING);
                }}
                name="reset"
            >
                Reset
            </button>
        </div>
    );
}
