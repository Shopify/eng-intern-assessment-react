import React, {useState} from 'react';

export default function StopWatchButton() {
    
    return(
        <div className="button-panel">
            <button>Start</button>
            <button>Stop</button>
            <button>Reset</button>
            <button>Lap</button>
        </div>
    )
}