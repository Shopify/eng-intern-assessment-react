import React, { useEffect, useState } from 'react'

export default function StopWatch({ seconds }: {seconds: number}) {
    return(
        <>
            <p>{seconds}s</p>
        </>
    )
}