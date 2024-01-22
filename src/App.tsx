import React from 'react'
import StopWatch from './StopWatch'
import { WatchProvider } from './WatchContext';

export default function App() {
    return(
        <WatchProvider>
            <StopWatch />
        </WatchProvider>
    )
}
