import React from 'react'
import './StopWatchButtonStyles.css'


interface FuncProps {
    startClicked: () => void;
    pauseClicked: () => void;
    resetClicked: () => void;
    lapClicked: () => void;
    }


export default function StopWatchButton({startClicked, pauseClicked, resetClicked, lapClicked}: FuncProps) {
    return(
        <div className="button-container" >
            <button onClick={() => startClicked()}>Start</button>
            <button onClick={() => pauseClicked()}>Pause</button>
            <button onClick={() => resetClicked()}>Reset</button>
            <button onClick={() => lapClicked()}>Lap</button>
        </div>
    );
}