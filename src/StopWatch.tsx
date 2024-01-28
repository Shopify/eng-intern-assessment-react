import React, { useState } from 'react'
import TimeDisplay from './TimeDisplay';
import Lap from './Lap';
import StopWatchButton, { ButtonVariant } from './StopWatchButton';
import useTimer, { TimerStatus } from './useTimer';


export default function StopWatch() {
    const { time, status, laps, controls } = useTimer();

    let buttons: React.ReactNode[] = [];
    if (status === TimerStatus.Unstarted) {
        buttons = [
            <StopWatchButton variant={ButtonVariant.Green} onClick={controls.start}>Start</StopWatchButton>,
        ];
    } else if (status === TimerStatus.Running) {
        buttons = [
            <StopWatchButton variant={ButtonVariant.Red} onClick={controls.stop}>Stop</StopWatchButton>,
            <StopWatchButton variant={ButtonVariant.Yellow} onClick={controls.reset}>Reset</StopWatchButton>,
        ];
    } else if (status === TimerStatus.Paused) {
        buttons = [
            <StopWatchButton variant={ButtonVariant.Green} onClick={controls.resume}>Resume</StopWatchButton>,
            <StopWatchButton variant={ButtonVariant.Yellow} onClick={controls.reset}>Reset</StopWatchButton>,
        ]
    }

    if (status === TimerStatus.Running || status === TimerStatus.Paused) {
        buttons.push(
            <StopWatchButton variant={ButtonVariant.Green} onClick={controls.addLap}>Lap</StopWatchButton>)
    }

    return (
        <div>
            <div className='clock-holder'>
                <div className='stopwatch'>
                    <TimeDisplay time={time} />
                    <div>
                        {...buttons}
                    </div>
                </div>
            </div>
            <Lap laps={laps} />
        </div>
    )
}