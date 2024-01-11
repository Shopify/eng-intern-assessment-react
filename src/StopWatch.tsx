import React from 'react'
import './utils/styles.css'
import StopWatchButton from './StopWatchButton'

interface TimersProps {
    mainTimer: string;
    lapTimer: string;
}

const Timers = ({ mainTimer, lapTimer }: TimersProps) => {
    return (
      <div className="timers-container">
        <div className="main-timer">{mainTimer}</div>
        <div className="lap-timer">{lapTimer}</div>
      </div>
    );
};

export default function StopWatch() {
    return(
        <div className="main">
            <div className="thin-gray-circle">
            <Timers mainTimer="00:00:00" lapTimer="00:00:00" />
            </div>
            <StopWatchButton/>
        </div>
    )
}