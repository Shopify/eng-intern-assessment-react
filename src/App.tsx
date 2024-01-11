import React from 'react';
import './App.css';
import Stopwatch from './StopWatch';
import logo from './shopitime_logo.png';

export default function App() {
    return (
        <div className="App">
            <Stopwatch />
            <div>
                <img src={logo} alt="ShopiTime Logo" style={{ width: '200px', height: 'auto' }} />
                <p>
                    Created by Kevin Manka for Shopify's internship program assessment.
                </p>
            </div>
        </div>
    );
}
