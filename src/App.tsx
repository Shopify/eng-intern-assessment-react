import React, { useState } from 'react'
import StopWatch from './StopWatch'

interface Lap {
    id:number,
    time: number
}

const App: React.FC = () => {
    const [isRunning, setIsRunning] = useState(false)
    const [time,setTime] = useState(0);
    const [laps,setLaps] = useState<Lap[]>([]);

    return (
        <div>
            <StopWatch isRunning={isRunning} time={time} laps={laps} />
        </div>
    )
}

export default App;