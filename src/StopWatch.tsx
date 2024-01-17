import React from 'react'

/**
 * This represents the stopwatch display
 */
export default function StopWatch({children}: StopWatchProps) {
    return(
        <div>
            {children}
        </div>
    )
}

type StopWatchProps = {
    children: React.ReactNode
}