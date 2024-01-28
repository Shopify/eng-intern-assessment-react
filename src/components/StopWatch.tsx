import React from 'react'
import LapResetButton from './buttons/LapResetButton';
import StartStopButton from './buttons/StartStopButton';
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';


export default function StopWatch() {
    const lightModeBackground = {
        fontFamily: 'Tahoma',
        fontSize: '100px',
        fontWeight: 'bold',
        width: '30vw',


        // linear-gradient(to top, transparent, #9bce39, #87ceeb)
        backgroundColor: '',
        color: '#000000',
        outline: 'none',

    }

    const currentMode = lightModeBackground;

    const [lapReset, setLapReset] = useState(true);

    const handleStartStop = (lapReset: boolean) => {
        setLapReset(lapReset);
    };

    return (
        <div className="container text-center" style={currentMode}>
            <h1 style={{ fontSize: '100px', fontWeight: 'bold', padding: '20px' }}>
                hr.min.sec
            </h1>

            <div className="row" style={{}}>
                <LapResetButton lapReset={lapReset}></LapResetButton>
                <div className="container" style={{ width: '1px' }}></div>
                <StartStopButton setLapResetButtonType={handleStartStop} ></StartStopButton>
            </div>


        </div>
    )
}