import React, {MouseEventHandler, ReactNode} from 'react'
import StopWatchButton from '../StopWatchButton'

interface Props {
    onReset?: MouseEventHandler
    children?: ReactNode
    // any props that come into the component
}

const ResetButton = ({ onReset, children }: Props) => {
  return (
        <StopWatchButton onClick={onReset}> {children} </StopWatchButton>
    )
}

export default ResetButton