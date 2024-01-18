import React, {MouseEventHandler} from 'react'
import StopWatchButton from '../StopWatchButton'

interface Props {
    setLap?: MouseEventHandler
    // any props that come into the component
}

const SetLapButton = ({ setLap }: Props) => {
  return (
        <StopWatchButton onClick={setLap}> setLap </StopWatchButton>
    )
}

export default SetLapButton