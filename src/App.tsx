import React, { useState } from 'react';
import './App.css';
import StopWatch from './StopWatch';

const App: React.FC = () => {
    return (
        <div className="App">
            <h1>Stopwatch</h1>
            <div className="stopwatch-container"></div>
            <StopWatch/>
        </div>
    );
};

    export default App;
