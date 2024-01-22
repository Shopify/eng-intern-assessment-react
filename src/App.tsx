import React from 'react';
import StopWatch from './components/StopWatch';
import StopWatchButton from './components/StopWatchButton';
import useStopwatch from './hooks/useStopwatch'; 

// Main App component that glues everything together
const App = () => {
  const stopwatch = useStopwatch();

  return (
    <div>
      <StopWatch elapsedTime={stopwatch.elapsedTime} laps={stopwatch.laps} />
      <StopWatchButton
        isRunning={stopwatch.isRunning}
        start={stopwatch.start}
        stop={stopwatch.stop}
        reset={stopwatch.reset}
        lap={stopwatch.lap}
      />
    </div>
  );
};

export default App;
