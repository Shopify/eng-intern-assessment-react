import React, {MouseEventHandler} from 'react'
import StopWatchButton from '../StopWatchButton'

interface Props {
    onStop?: MouseEventHandler
    // any props that come into the component
}

const StopButton = ({ onStop }: Props) => {
  return (
        <StopWatchButton onClick={onStop}> Stop </StopWatchButton>
    )
}

export default StopButton