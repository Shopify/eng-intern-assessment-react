import React from "react";

interface StopwatchButtonProps {
   isActive: boolean;
   isPaused: boolean;
   handleStart: () => void;
   handleStop: () => void;
   handleReset: () => void;
   handleLap: () => void;
}

export default function StopWatchButton({
   isActive,
   isPaused,
   handleStart,
   handleStop,
   handleReset,
   handleLap,
}: StopwatchButtonProps) {
   return (
      <div>
         {!isActive && !isPaused ? (
            <button onClick={handleStart}>Start</button>
         ) : isPaused ? (
            <button onClick={handleStart}>Resume</button>
         ) : (
            <button onClick={handleStop}>Stop</button>
         )}
         <button onClick={handleReset} disabled={!isActive && !isPaused}>
            Reset
         </button>
         {isActive && <button onClick={handleLap}>Lap</button>}
      </div>
   );
}
