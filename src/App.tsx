import React from 'react'
import StopWatch from "./components/StopWatch/StopWatch"
import useStopWatch from './components/StopWatch/hooks/useStopWatch'
import StopWatchButton from './components/StopWatch/StopWatchButton/StopWatchButton'
export default function App() {
    const sw = useStopWatch({})

    return(
        <div>
            <StopWatch sw={sw}>
                <div>
                    <h1>Stop Watch</h1>
                </div>
                <StopWatchButton action={sw.actions.start} type='start' />
                <StopWatchButton action={sw.actions.stop} type='stop' />
                <StopWatchButton action={sw.actions.reset} type='reset' />

            {sw.milliseconds}
            </StopWatch>
        </div>
    )
}