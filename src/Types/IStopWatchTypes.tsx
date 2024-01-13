// Interface for types for StopWatchButtonProps
export interface IStopWatchProps {
    timeDisplay: (string | number)[],
    start: () => void,
    stop: () => void,
    reset: () => void,
    lap: () => void,
    laps: number[]
}
