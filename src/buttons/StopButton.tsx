import React, {MouseEventHandler, ReactNode} from 'react'
import StopWatchButton from '../StopWatchButton'

interface Props {
    onStop?: MouseEventHandler
    children?: ReactNode

    // any props that come into the component
}

const StopButton = ({ onStop, children }: Props) => {
  return (
        <StopWatchButton onClick={onStop}> {children} </StopWatchButton>
    )
}

export default StopButton