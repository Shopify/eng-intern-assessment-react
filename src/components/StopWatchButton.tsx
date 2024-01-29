import React, { SetStateAction } from 'react'

type StopWatchButtonVariant = 'start' | 'stop' | 'reset' | 'lap'
interface StopWatchButtonProps {
    variant: StopWatchButtonVariant
    setTimerRunning?: React.Dispatch<SetStateAction<boolean>>
    setTime?: React.Dispatch<SetStateAction<number>>
    time?: number
    setLaps?: React.Dispatch<SetStateAction<number[]>>
    timerRunning?: boolean
    disabled?: boolean
}

export default function StopWatchButton({ variant, setTimerRunning, setTime, time, setLaps, timerRunning, disabled = false }: StopWatchButtonProps) {
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

    const getStopWatchButtonByVariant = (variant: StopWatchButtonVariant)  => { 
        let buttonText: string
        let buttonColor: string
        let onClick: () => void

        switch (variant) { 
            case 'start':
                buttonText = 'Start'
                buttonColor = '#0da84e'
                onClick = () => { 
                    setTimerRunning(true)
                }
                break;
            case 'stop':
                buttonText = 'Stop'
                buttonColor = '#b04343'
                onClick = () => { 
                    setTimerRunning(false)

                }
                break;
            case 'reset':
                buttonText = 'Reset'
                buttonColor = '#d1c0c0'
                onClick = () => { 
                    setTime(0)
                    setLaps([])
                }
                break;
            case 'lap':
                buttonText = 'Lap'
                buttonColor = '#d1c0c0'
                onClick = () => { 
                    if (timerRunning) {
                        setLaps((prevLaps) => { 
                            return  [...prevLaps, time]
                        })
                    }
                }
                break;
        }
        return <button style={{...buttonStyle, backgroundColor: buttonColor}} onClick={onClick} disabled={disabled}>{buttonText}</button>
    }
    return getStopWatchButtonByVariant(variant)
}