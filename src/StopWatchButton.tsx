import React from 'react';
import StopWatch from './StopWatch';
import StopWatchButton from './StopWatchButton';


export default function StopWatchButton() {
    return (
        <div>
            <StopWatch time={0} laps={[]} />
            <StopWatchButton isRunning={false} onStartStopClick={() => { }} onLapClick={() => { }} onResetClick={() => { }} />
        </div>
    )
}