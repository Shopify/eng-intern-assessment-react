import React from 'react';
import { useState } from "react";
import StopWatch from './components/StopWatch';
import LapResetButton from './components/buttons/LapResetButton';
import StartStopButton from './components/buttons/StartStopButton';
import 'bootstrap/dist/css/bootstrap.css';

export default function App() {
  const lightMode = {
    borderRadius: '50px',
    padding: '20px 20px',
    width: '90px',
    backgroundColor: '#d9534f',
    color: '#fff',
    cursor: 'pointer',
    border: 'none',
    outline: 'none',
  }

  const darkMode = {
    borderRadius: '50px',
    padding: '20px 20px',
    width: '90px',
    backgroundColor: '#d9534f',
    color: '#fff',
    cursor: 'pointer',
    border: 'none',
    outline: 'none',
  }

  const [mode, setMode] = useState(true);

  const toggleStyle = () => {
    setMode((prevMode) => !prevMode);
  };

  const currentMode = mode ? lightMode : darkMode;

  const [lapReset, setLapReset] = useState(true);

  const handleStartStop = (lapReset: boolean) => {
    setLapReset(lapReset);
  };

  return (<div className="container">
    <StartStopButton setLapResetButtonType={handleStartStop}></StartStopButton>
    <LapResetButton lapReset={lapReset}></LapResetButton>
  </div>
  );
}