import React from 'react'

/**
 * This represents the buttons used by the stopwatch
 */
export default function StopWatchButton({children}: StopWatchButtonProps) {
    return(
        <button>
            {children}
        </button>
    )
}

type StopWatchButtonProps = {
    children: React.ReactNode
}