import React from 'react';
import { useState } from "react";
import StopWatch from './components/StopWatch';
import LapResetButton from './components/buttons/LapResetButton';
import StartStopButton from './components/buttons/StartStopButton';
import 'bootstrap/dist/css/bootstrap.css';


export default function App() {
  const lightModeBackground = {
    fontFamily: 'Tahoma',
    fontSize: '100px',
    fontWeight: 'bold',
    minWidth: '100%',
    minHeight: '100vh',

    // linear-gradient(to top, transparent, #9bce39, #87ceeb)
    background: 'linear-gradient(to bottom right,rgba(34, 224, 114, 0.5) 0%, transparent 20%), linear-gradient(to bottom left, rgba(155, 206, 57, 0.6) 0%, transparent 20%), linear-gradient(to bottom, rgba(172, 236, 250, 1) 0%, transparent 40%), linear-gradient(to top, rgba(123, 216, 130, 0.3) 0%, transparent 100%)',
    color: '#000000',
    outline: 'none',

  }

  const darkModeBackground = {
    fontFamily: 'Myriad',
    textSize: '400px',
    borderRadius: '50px',
    padding: '20px 20px',
    width: '100%',
    height: '100%',
    backgroundColor: '#d9534f',
    color: '#fff',
    border: 'none',
    outline: 'none',
  }

  const [mode, setMode] = useState(true);

  const toggleStyle = () => {
    setMode((prevMode) => !prevMode);
  };

  const currentMode = mode ? lightModeBackground : darkModeBackground;




  return (
    <div className="container text-center" style={currentMode}>

      <h1 style={{ fontSize: '50px', fontWeight: 'bold', fontFamily: 'Myriad', paddingTop: '30px' }}>
        watchify
      </h1>

      <h2 style={{ fontSize: "30px", fontWeight: 'bold' }}>
        The *unofficial* stopwatch partner of <strong>Shopify</strong>

      </h2>
      <h2 style={{ fontSize: "20px", fontWeight: 'bold' }}>
        by Omar El Malak
      </h2>

      <div className="container" style={{ height: '5vh' }}></div>
      <div>
        <StopWatch></StopWatch>
      </div>
    </div>
  );
}