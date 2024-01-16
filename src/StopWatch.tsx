import React, { useState } from "react"

import { StopWatchButton } from "./StopWatchButton"
import { useRerenderEveryFrame } from "./util/hooks"
import { durationToString } from "./util/time"

type State =
  | {
      // When stopped, store the duration directly
      type: "stopped"
      duration: number
    }
  | {
      // When running, store the start time instead of accumulating the duration
      // to prevent the duration from drifting.
      type: "running"
      startTime: number
    }

const getDuration = (state: State) => {
  if (state.type === "running") {
    return Date.now() - state.startTime
  } else {
    return state.duration
  }
}

// The display will re-render every frame while the stopwatch is running,
// so we separate it into a component to prevent unnecessary re-renders.
const StopWatchDisplay = ({ state }: { state: State }) => {
  useRerenderEveryFrame(state.type === "running")
  return <span data-testid="stopwatch-display">{durationToString(getDuration(state))}</span>
}

export const StopWatch = () => {
  const [state, setState] = useState<State>({ type: "stopped", duration: 0 })
  const [laps, setLaps] = useState<number[]>([])

  const isInitial = state.type === "stopped" && state.duration === 0

  const reset = () => {
    // Reset duration but do not change the running state
    const now = Date.now()
    if (state.type === "running") {
      setState({ type: "running", startTime: now })
    } else {
      setState({ type: "stopped", duration: 0 })
    }
    setLaps([])
  }

  const start = () => {
    // To allow resuming, set startTime so that Date.now() - startTime === duration
    setState({ type: "running", startTime: Date.now() - getDuration(state) })
  }

  const stop = () => {
    // Store the resolved duration
    setState({ type: "stopped", duration: getDuration(state) })
  }

  const lap = () => {
    setLaps([...laps, getDuration(state)])
  }

  return (
    // tabular-nums to prevent the numbers from jumping around
    <div className="flex flex-col items-center justify-center gap-10 tabular-nums">
      <h2 className="text-9xl font-normal">
        {/* Show the current duration. */}
        <StopWatchDisplay state={state} />
      </h2>
      <div className="flex gap-10">
        {/* Stopwatch buttons */}
        {state.type === "running" ? (
          <StopWatchButton data-testid="stopwatch-stop" onClick={stop}>
            Stop
          </StopWatchButton>
        ) : (
          <StopWatchButton data-testid="stopwatch-start" onClick={start}>
            Start
          </StopWatchButton>
        )}
        <StopWatchButton data-testid="stopwatch-reset" onClick={reset} disabled={isInitial}>
          Reset
        </StopWatchButton>
        <StopWatchButton data-testid="stopwatch-lap" onClick={lap}>
          Lap
        </StopWatchButton>
      </div>
      {/* Show laps as a table */}
      {laps.length > 0 && (
        <div className="relative mt-6">
          <table className="table-auto text-right" data-testid="stopwatch-laps">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-2">Lap</th>
                <th className="px-4 py-2">Delta</th>
                <th className="px-4 py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {laps
                .map((lapDuration, index) => (
                  <tr key={index} className={(laps.length - index) % 2 === 0 ? "bg-gray-100" : ""}>
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">
                      {/* Time since the previous lap */}
                      {durationToString(lapDuration - (laps[index - 1] ?? 0))}
                    </td>
                    <td className="px-4 py-2">{durationToString(lapDuration)}</td>
                  </tr>
                ))
                // Reverse to show the latest lap at the top
                .reverse()}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
