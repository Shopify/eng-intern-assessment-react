import React from 'react'
import ClockLoader from './components/loading/ClockLoader'
import './App.css'
import StopWatch from './components/StopWatch/StopWatch';

export default function App() {
    return (
       <div className="app">
          {/* <ClockLoader className="clock-loader" loadingSpeed={1.3} clockColor="#4082fc" loadingColor="#D85049" /> */}
          <StopWatch />
       </div>
    );
}