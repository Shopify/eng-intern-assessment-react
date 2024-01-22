import React from 'react'
import { StopWatchContext } from './StopWatchContext';

export default function StopWatchButton() {
    const data = React.useContext(StopWatchContext);

    return(
        <div>
            {/* start/stop btn */}
            <button onClick={() => {
                if(data.paused) {
                    data.startTimer();
                }
                else {
                    data.stopTimer();
                }
            }}>
                {data.paused ? 'Start' : 'Stop'}
            </button>
            {/* lap/reset btn */}
            <button onClick={() => {
                if(data.paused && data.starttime != 0) {
                    data.resetTimer();
                }
                else {
                    data.createLap();
                }
            }} disabled={data.starttime == 0}>
                {data.paused && data.starttime != 0 ? 'Reset' : 'Lap'}
            </button>
        </div>
    )
}