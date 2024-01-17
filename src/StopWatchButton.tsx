import React from 'react'

/**
 * This represents the buttons used by the stopwatch
 */
export default function StopWatchButton({children}: StopWatchButtonProps) {
    return(
        <div>
            {children}
        </div>
    )
}

type StopWatchButtonProps = {
    children: React.ReactNode
}