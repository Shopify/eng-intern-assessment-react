import React from 'react'
import StopWatch from './stop-watch/StopWatch'

export default function App() {

    const title = "Shopify Stopwatch";

    return(
        <div>
            <StopWatch title={title}/>
        </div>
    )
}