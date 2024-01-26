import React from 'react'
import Header from './Components/Header/Header'
import StopWatch from './Components/StopWatch/StopWatch'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
    return(
        <div>
            <Header />
            <StopWatch />
        </div>
    )
}