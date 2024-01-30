import React from 'react';
import Stopwatch from './StopWatch';
import './assets/App.css';

const App: React.FC = () => {
    return (
        <div className="app-container">
            <Stopwatch />
        </div>
    );
};

export default App;