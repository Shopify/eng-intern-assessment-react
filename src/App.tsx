import React from 'react'
import StopWatch from './StopWatch'

export default function App() {
    const [time, setTime] = React.useState<number>(0.00);
    return(
        <div>
            <StopWatch time={time} />
        </div>
    )
}