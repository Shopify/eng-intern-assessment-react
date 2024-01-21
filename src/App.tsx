import React from 'react'
import StopWatch from "./components/StopWatch/StopWatch"
import useStopWatch from './components/StopWatch/hooks/useStopWatch'
import StopWatchButton from './components/StopWatch/StopWatchButton/StopWatchButton'
import { DigitalDisplay } from './components/StopWatch/DigitalDisplay'
import {StopWatchButtonGroup} from "./components/StopWatch"
import { LapDisplay } from './components/StopWatch/LapDisplay'
export default function App() {
    const sw = useStopWatch({})

    return(
        <div>
            <StopWatch darkTheme sw={sw}>
                <div>
                    <h1 style={{
                        color:"#96BF48"
                    }}>Stop Watch</h1>
                </div>
                <StopWatchButtonGroup />
                <DigitalDisplay />
                <LapDisplay />
            </StopWatch>
        </div>
    )
}