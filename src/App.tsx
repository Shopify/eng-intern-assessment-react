import React from 'react'
import Header from './Components/Header/Header'
import StopWatch from './Components/StopWatch/StopWatch'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

/*
    App component that displays the app
    This component uses the Header and StopWatch components
*/

export default function App() {
    return(
        <div>
            <Header />
            <StopWatch />
        </div>
    )
}