import React, {MouseEventHandler, ReactNode} from 'react'
import './StopWatchButton.css'

interface Props {
    children?: ReactNode
    onClick?: MouseEventHandler
    // any props that come into the component
}
export default function StopWatchButton( {onClick, children}: Props) {
    return(
        <button onClick={onClick}>
                    {children}
        </button>
    )
}