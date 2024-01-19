import React, { useState, useEffect } from 'react';
import Stopwatch from './components/StopWatch';
import StopwatchButton from './components/StopWatchButton';
import LapTable from './components/LapTable';
import DarkModeToggle from './components/DarkModeToggle';
import './styles/App.css';

const App: React.FC = () => {
  // State for tracking milliseconds elapsed, stopwatch status, laps recorded, and dark mode status
  const [milliseconds, setMilliseconds] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [laps, setLaps] = useState<{ lapTime: number; currentTime: string }[]>([]);
  const [startTime, setStartTime] = useState<number | null>(null);

  // Initialize dark mode state from localStorage with error handling
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem('darkMode') === 'true';
    } catch (error) {
      console.error("Error accessing localStorage for darkMode:", error);
      return false; // Default value if localStorage is not accessible
    }
  });

  // useEffect for handling the stopwatch timer functionality
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && startTime === null) {
      // Record the start time when the stopwatch starts
      setStartTime(Date.now() - milliseconds);
    }

    if (isActive) {
      // Update milliseconds based on the difference between current time and start time
      interval = setInterval(() => {
        setMilliseconds(Date.now() - (startTime ?? Date.now()));
      }, 10);
    } else {
      // Reset the start time when the stopwatch stops
      setStartTime(null);
    }

    return () => {
      // Clear interval when component unmounts or stopwatch is deactivated
      if (interval) clearInterval(interval);
    };
  }, [isActive, startTime, milliseconds]);

  // useEffect for persisting dark mode state in localStorage with error handling
  useEffect(() => {
    try {
      localStorage.setItem('darkMode', darkMode.toString());
    } catch (error) {
      console.error("Error saving darkMode to localStorage:", error);
    }
  }, [darkMode]);

  // Function to toggle dark mode
  const toggleDarkMode = (): void => {
    setDarkMode(!darkMode);
  };

  // Function to start/stop the stopwatch
  const handleStartStop = (): void => {
    setIsActive(!isActive);
  };

  // Function to reset the stopwatch
  const handleReset = (): void => {
    setMilliseconds(0);
    setLaps([]);
  };

  // Function to record a lap
  const handleLap = (): void => {
    if (isActive) {
      const currentTime = new Date().toLocaleString('en-US', {
        timeZone: 'EST',
        hour12: true,
      });
      setLaps((prevLaps) => [{ lapTime: milliseconds, currentTime }, ...prevLaps]);
    }
  };

  // Function to clear all recorded laps
  const handleClearLaps = (): void => {
    setLaps([]);
  };

  // Function to format time from milliseconds to a readable format
  const formatLap = (milliseconds: number): string => {
    // Conversion of milliseconds into hours, minutes, seconds, and centiseconds
    const hours = Math.floor(milliseconds / 3600000).toString().padStart(2, '0');
    const minutes = Math.floor((milliseconds % 3600000) / 60000).toString().padStart(2, '0');
    const seconds = Math.floor((milliseconds % 60000) / 1000).toString().padStart(2, '0');
    const centiseconds = ((milliseconds % 1000) / 10).toFixed(0).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}.${centiseconds}`;
  };

  // Function to export lap times as a CSV file
  const handleExport = (): void => {
    // Prepare data rows for CSV
    const rows = [
      ["Lap", "Lap Time", "Elapsed Time", "Current Time & Date"],
      ...laps.map((lap, index, array) => [
        `Lap ${array.length - index}`,
        formatLap(lap.lapTime),
        index < array.length - 1 ? formatLap(lap.lapTime - array[index + 1].lapTime) : "00:00:00.00",
        `"${lap.currentTime}"` // Enclose the datetime in backticks so it doesnt become a seperate column
      ])
    ];
    
    // Create and trigger a download link for the CSV file
    let csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "lap_times.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`} data-theme={darkMode ? 'dark' : 'light'} data-testid="app-div">
      <div className="header">
        <h1>Timer</h1>
        <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </div>
      <Stopwatch milliseconds={milliseconds} />
      <StopwatchButton
        isActive={isActive}
        onStartStop={handleStartStop}
        onReset={handleReset}
        onLap={handleLap}
        onClearLaps={handleClearLaps}
      />
      {laps.length > 0 && (
        <LapTable
          laps={laps}
          formatLap={formatLap}
          handleClearLaps={handleClearLaps}
          handleExport={handleExport}
        />
      )}
    </div>
  );
};

export default App;