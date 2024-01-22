import React from 'react';
import StopWatch from './components/StopWatch';
import StopWatchButton from './components/StopWatchButton';
import useStopwatch from './hooks/useStopwatch'; 

const App = () => {
  const stopwatch = useStopwatch();

  return (
    <div>
      {/* Stopwatch display */}
      <StopWatch elapsedTime={stopwatch.elapsedTime} laps={stopwatch.laps} /> 
      
      {/* Control buttons */}
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
