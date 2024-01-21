import React from 'react'
import StopWatch from "./components/StopWatch/StopWatch"
import useStopWatch from './components/StopWatch/hooks/useStopWatch'
import StopWatchButton from './components/StopWatch/StopWatchButton/StopWatchButton'
import { DigitalDisplay } from './components/StopWatch/DigitalDisplay'
export default function App() {
    const sw = useStopWatch({})

    return(
        <div>
            <StopWatch sw={sw}>
                <div>
                    <h1>Stop Watch</h1>
                </div>
                <StopWatchButton action={sw.actions.start} type='Start' />
                <StopWatchButton action={sw.actions.stop} type='Stop' />
                <StopWatchButton action={sw.actions.reset} type='Reset' />

                <DigitalDisplay />
            </StopWatch>
        </div>
    )
}