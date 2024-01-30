// import React, { useState } from 'react'
// renders the stopwatch and handles its functionality
// Functionality:
/*
The stopwatch should start counting when the user clicks the start button.
The stopwatch should stop counting when the user clicks the stop button.
The stopwatch should reset to zero when the user clicks the reset button.
The stopwatch should record and display laps when user clicks the lap button.
*/

import React from "react";
import StopWatch from "./StopWatch";
import "./stopwatch.css";



// The main component that renders the stopwatch and handles its functionality.
export default function App() {


    return (
        <div className="App">
            <h1 className="title">StopWatch</h1>
            <StopWatch />
        </div>
    );
}