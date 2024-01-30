//enum denoting the status timer is in
export enum TimerStatus {
  NOT_STARTED = "NOT_STARTED",
  RUNNING = "RUNNING",
  PAUSED = "PAUSED",
}

//colors for indicating slowest and fastest laps
export enum LapColour {
  red = "RED",
  green = "GREEN",
}

//minimum number of laps that must be there to display the slowest and fastest laps
export const MINIMUM_LAPS_THRESHOLD = 2;
