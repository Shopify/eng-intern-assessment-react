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

export default function StopWatchButton({ variant, setTimerRunning, setTime, time, setLaps, laps, timerRunning }: StopWatchButtonProps) {
    const buttonStyle = { 
        display: 'inline-block',
        padding: '20px 20px',
        border: 'solid white',
        width: '90px',
        height: '85px',
        borderRadius: '100%',
        fontSize: '16px',
        cursor: 'pointer'
    }

    const handleLap = () => {
        if (timerRunning) {
            setLaps([time, ...laps])
        }
    }

    const getStopWatchButtonByVariant = (variant: StopWatchButtonVariant) => { 
        let button

        switch (variant) { 
            case 'start':
                button = <button style={{...buttonStyle, backgroundColor:'#0da84e'}} onClick={() => {
                    setTimerRunning(true)
                }
                }>Start</button>
                break;
            case 'stop': 
                button = <button style={{...buttonStyle, backgroundColor:'#b04343'}}onClick={() => {
                    setTimerRunning(false)
                }}>Stop</button>
                break;
            case 'reset':
                button = <button style={{...buttonStyle, backgroundColor:'#d1c0c0'}} onClick={() => {
                    setTime(0)
                    setLaps([])
                }}>Reset</button>
                break;
            case 'lap':
                button = <button style={{...buttonStyle, backgroundColor:'#d1c0c0'}} onClick={handleLap}>Lap</button>
                break
        }
        return button
    }

    return getStopWatchButtonByVariant(variant)
}