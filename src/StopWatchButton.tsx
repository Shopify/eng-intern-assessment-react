import React from 'react';
import './StopWatch.css';

export interface buttonProps {
    isRunning: boolean;
    startStop:() => void;
    resetLap:() => void;
    buttonColor: string;
    textColor: string;
}


export default function StopWatchButton(props: buttonProps) {
    return(
        <div className = "buttons">  
          <button onClick={props.resetLap}>{props.isRunning ? 'Lap' : 'Reset'}</button>          
          <button style={{ backgroundColor: props.buttonColor, color: props.textColor }} 
                  onClick={props.startStop}>{props.isRunning ? 'Stop' : 'Start'}</button>
        </div>
    )
}