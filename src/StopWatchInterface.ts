interface LapType {
  elapsedTime: number;
}

interface ContextType {
  isRunning: boolean;
  elapsedTime: number;
  laps: LapType[];
  slowestLap: number;
  fastestLap: number;
  handleStart: () => void;
  handleStop: () => void;
  handleLap: () => void;
  handleReset: () => void;
}
