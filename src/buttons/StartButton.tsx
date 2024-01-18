import React, {MouseEventHandler} from 'react'
import StopWatchButton from '../StopWatchButton'

interface Props {
    onStart?: MouseEventHandler
    // any props that come into the component
}

const StartButton = ({ onStart }: Props) => {
  return (
        <StopWatchButton onClick={onStart}> Start </StopWatchButton>
    )
}

export default StartButton