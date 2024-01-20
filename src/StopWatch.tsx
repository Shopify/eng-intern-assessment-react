import React from 'react'

export default function StopWatch({ seconds }: { seconds: number }) {
    return (
        <>
            {/* Show leading zero if hours, minutes or seconds is less than 10 */}
            <p>{new Date(seconds * 1000).toISOString().slice(11, 19)}</p>
        </>
    )
}