import React, { useRef } from "react";

type StopwatchState = "idle" | "running";

type UseStopwatch = {
  state: StopwatchState;
  elapsedTime: number; 
  handleStart: () => void;
  handleStop : () => void;
}

type UseStopwatchParams = {
  initialTime?: number;
}

/**
 * A hook that encapsulates stopwatch behaviour.
 * 
 * @example
 * 
 * ```tsx
 * 
 * ```
 */
export default function useStopWatch({
  initialTime,
}: UseStopwatchParams): UseStopwatch {
  const [state, setState] = React.useState<StopwatchState>("idle");
  const [elapsedTime, setElapsedTime] = React.useState<number>(initialTime ?? 0);

  const intervalRef = useRef<NodeJS.Timer | null>(null)

  const handleStart = React.useCallback(() => {
    
  }, [])

  const handleStop = React.useCallback(() => {

  }, [])

  const handleReset = React.useCallback(() => {

  }, [])

  return {
    state,
    elapsedTime,
    handleStart,
    handleStop
  }
}

export type { 
  StopwatchState,
  UseStopwatch,
  UseStopwatchParams
}