export interface StopWatchButtonProps {
  buttonType: string;
  handleStopwatchButton: (e: React.MouseEvent<HTMLElement>) => void;
}
export interface WatchTime {
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}
