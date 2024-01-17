import React from 'react'

/**
 * This represents the stopwatch display
 */
export default function StopWatch({children}: StopWatchProps) {
    return(
        <div className="p-5 text-8xl text-center">
            {children}
        </div>
    )
}

type StopWatchProps = {
    children: React.ReactNode
}