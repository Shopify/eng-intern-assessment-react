import React, { SetStateAction } from 'react'


type StopWatchButtonVariant = 'start' | 'stop' | 'reset' | 'lap'

interface StopWatchButtonProps {
    variant: StopWatchButtonVariant
    setTimerRunning?: React.Dispatch<SetStateAction<boolean>>
    setTime?: React.Dispatch<SetStateAction<number>>
    time?: number
    setLaps?: React.Dispatch<SetStateAction<number[]>>
    laps?: number[]
    timerRunning?: boolean
  }

export default function StopWatchButton({variant, setTimerRunning, setTime, time, setLaps, laps, timerRunning}:StopWatchButtonProps) {

    const handleLap = () =>{
        if (timerRunning) {
            setLaps([...laps, time])
        }
    }
    
    if (variant == 'start') { 
        return  <button onClick={() => { 
            setTimerRunning(true)
        }
       }>Start</button>
    }

    if (variant == 'lap') { 
        return <button onClick={handleLap}>Lap</button>
    }

    if (variant == 'reset') { 
        return <button onClick={() =>{ 
            setTime(0)
            setLaps([])
        }}>Reset</button>
    }

    if (variant == 'stop') { 
        return <button onClick={() => { 
            setTimerRunning(false)
        }}>Stop</button>
    }
}