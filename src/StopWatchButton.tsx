import React from 'react';

type StopWatchButtonProps = {
  isRunning: boolean;
  isStarted: boolean;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
  onLap: () => void;
};

/**
 * Renders and displays the buttons for the stopwatch, depending on its state.
 * @param isRunning (boolean) Indicates whether the stopwatch is currently running.
 * @param isStarted (boolean) Indicates whether the stopwatch has been started.
 * @param onStart (function) Runs when the Start button is clicked.
 * @param onStop (function) Runs when the Stop button is clicked.
 * @param onReset (function) Runs when the Reset button is clicked.
 * @param onLap (function) Runs when the Lap button is clicked.
 * @returns {React.ReactElement} A rendered display of the stopwatch buttons.
 */
export default function StopWatchButton({
  isRunning,
  isStarted,
  onStart,
  onStop,
  onReset,
  onLap,
}: StopWatchButtonProps) {
  return (
    <div className="button-container">
      {isRunning ? (
        <>
          <button className="button-stop" onClick={onStop}>
            Stop
          </button>
          <button onClick={onLap}>Lap</button>
        </>
      ) : (
        <>
          <button className="button-start" onClick={onStart}>
            {isStarted ? 'Resume' : 'Start'}
          </button>
          <button onClick={onReset}>Reset</button>
        </>
      )}
    </div>
  );
}
