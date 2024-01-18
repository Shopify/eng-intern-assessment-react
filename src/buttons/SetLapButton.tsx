import React, {MouseEventHandler, ReactNode} from 'react'
import StopWatchButton from '../StopWatchButton'

interface Props {
    setLap?: MouseEventHandler
    children?: ReactNode
    // any props that come into the component
}

const SetLapButton = ({ setLap, children }: Props) => {
  return (
        <StopWatchButton onClick={setLap}> {children} </StopWatchButton>
    )
}

export default SetLapButton