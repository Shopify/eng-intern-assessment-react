import React from 'react';
import './styles/App.css';
import DynamicBackground from './components/DynamicBackground'; 
import StopWatch from './components/StopWatch'; // UI for displaying time and laps
import StopWatchButton from './components/StopWatchButton'; // UI for buttons
import useStopwatch from './hooks/useStopwatch'; // All logic for stopwatch
import usePerformanceCheck from './hooks/usePerformanceCheck'; // Checks if device performance meets a specified threshold
import Spline from '@splinetool/react-spline'; // Import Spline for 3D graphics

// Main App component
const App = () => {
  const stopwatch = useStopwatch(); // Stopwatch states
  const isPerformanceAdequate = usePerformanceCheck(30); // Ensures performance above 30 FPS

  return (
    <div id="app">
      {isPerformanceAdequate && ( // Renders 3D graphics only if performance is adequate
        <div className="spline-container">
          <Spline scene="https://prod.spline.design/hCVt0dd5ERiAZIsy/scene.splinecode" />
        </div>
      )}

      <DynamicBackground /> 

      <StopWatch elapsedTime={stopwatch.elapsedTime} /> 

      <div className="stopwatch-buttons-container">
        <StopWatchButton
          isRunning={stopwatch.isRunning}
          isPaused={stopwatch.isPaused}
          start={stopwatch.start}
          pause={stopwatch.pause}
          reset={stopwatch.reset}
          lap={stopwatch.lap}
          startTime={stopwatch.startTime}
        />
      </div> 

      <StopWatch elapsedTime={stopwatch.elapsedTime} laps={stopwatch.laps} showLaps />

    </div>
  );
};

export default App;