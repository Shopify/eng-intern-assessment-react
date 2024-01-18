import React, {MouseEventHandler, ReactNode} from 'react'
import StopWatchButton from '../StopWatchButton'

interface Props {
    onStart?: MouseEventHandler
    children?: ReactNode
    // any props that come into the component
}

const StartButton = ({ onStart, children }: Props) => {
  return (
        <StopWatchButton onClick={onStart}> {children} </StopWatchButton>
    )
}

export default StartButton