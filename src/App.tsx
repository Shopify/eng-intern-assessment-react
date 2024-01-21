import React from 'react'
import StopWatch from "./components/StopWatch/StopWatch"
import useStopWatch from './components/StopWatch/hooks/useStopWatch'

export default function App() {
    const sw = useStopWatch({})

    return(
        <div>
            <StopWatch sw={sw}>
                <div>
                    <h1>Stop Watch</h1>
                </div>
                
            </StopWatch>
        </div>
    )
}