import React from 'react'
type Props = { //created the props for the buttons, which include each buttons functions
    isRunning: boolean;
    onStart: () => void;
    onStop: () => void;
    onReset: () => void;
    onLap: () => void;
  };
  
  export default function StopWatchButton({ //exports this to the components above
    isRunning,
    onStart,
    onStop,
    onReset,
    onLap,
  }: Props) {
    return (//renders the buttons
      <div>
        <button onClick={onStart}>Start</button>
        <button onClick={onStop}>Stop</button>
        <button onClick={onReset}>Reset</button>
        <button onClick={onLap}>Lap</button>
      </div>
    );
  }