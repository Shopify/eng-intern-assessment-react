import React from 'react';
import StopWatch from './components/StopWatch';
import StopWatchButton from './components/StopWatchButton';
import useStopwatch from './hooks/useStopwatch'; 

const App = () => {
  const stopwatch = useStopwatch(); 

  return (
    <div>
      <StopWatch elapsedTime={stopwatch.elapsedTime} /> 
      <StopWatchButton
        isRunning={stopwatch.isRunning}
        start={stopwatch.start}
        stop={stopwatch.stop}
        reset={stopwatch.reset}
        
      /> 
    </div>
  );
};

export default App;
