import React, { useEffect, useState } from 'react'

export default function StopWatch({ hours, minutes, seconds }: { hours: number, minutes: number, seconds: number }) {
    return(
        <>
            {/* Show leading zero if hours, minutes or seconds is less than 10 */}
            <p>{String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}</p>
        </>
    )
}