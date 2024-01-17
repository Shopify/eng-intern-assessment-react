import React from 'react'

/**
 * This represents the buttons used by the stopwatch
 */
export default function StopWatchButton({children}: StopWatchButtonProps) {
    return(
        <button className="bg-gray-100 p-5">
            {children}
        </button>
    )
}

type StopWatchButtonProps = {
    children: React.ReactNode
}