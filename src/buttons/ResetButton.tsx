import React, {MouseEventHandler} from 'react'
import StopWatchButton from '../StopWatchButton'

interface Props {
    onReset?: MouseEventHandler
    // any props that come into the component
}

const ResetButton = ({ onReset }: Props) => {
  return (
        <StopWatchButton onClick={onReset}> Reset </StopWatchButton>
    )
}

export default ResetButton