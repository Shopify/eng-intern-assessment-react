import React, { useState, useEffect, useRef } from 'react';

type ButtonProps = {
    title: string;
    onClick: () => void;
  };

export default function StopWatchButton({title, onClick}: ButtonProps) {
    return(
        <div>
            <button className="button" onClick={onClick}>
                {title}
            </button>
                {/* <button onClick={startStopwatch} >Start</button>
                <button onClick={stopStopwatch} >Stop</button>
                <button onClick={resetStopwatch}>Reset</button>
                <button onClick={recordLap}>Lap</button> */}
                
            

            {/* <button id="button-start">Start</button>
            <button id="button-stop">Stop</button>
            <button id="button-reset">Reset</button>
            <button id="button-lap">Lap</button> */}
        </div>
    )
}