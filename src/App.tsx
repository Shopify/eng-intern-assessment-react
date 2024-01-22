import React from 'react';
import './styles/App.css'; 
import DynamicBackground from './components/DynamicBackground';
import StopWatch from './components/StopWatch';
import StopWatchButton from './components/StopWatchButton';
import useStopwatch from './hooks/useStopwatch';

// Main App component that integrates all components
const App = () => {
  const stopwatch = useStopwatch();

  return (
    <div id="app">
      {/* Adding the DynamicBackground component */}
      <DynamicBackground /> 
      {/* Stopwatch display for time */}
      <StopWatch elapsedTime={stopwatch.elapsedTime} />
      {/* Stopwatch control buttons */}
      <StopWatchButton
        isRunning={stopwatch.isRunning}
        isPaused={stopwatch.isPaused}
        start={stopwatch.start}
        pause={stopwatch.pause}
        reset={stopwatch.reset}
        lap={stopwatch.lap}
        startTime={stopwatch.startTime}
      />
      {/* Stopwatch display for laps */}
      <StopWatch elapsedTime={stopwatch.elapsedTime} laps={stopwatch.laps} showLaps />
    </div>
  );
};

export default App;
