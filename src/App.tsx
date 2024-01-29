import React from 'react'
import StopWatch from './components/StopWatch/StopWatch'
import './App.css'
export default function App() {
    return (
        <main>
            <header>
            <h1 className='title'>stopwatch</h1>
            <section className="icon__container">
                    <a href="https://github.com/heckyeakelly/eng-intern-assessment-react/tree/develop"><img src="" alt="GitHub logo" /></a>
                    <a href="https://www.linkedin.com/in/kelly-kou/"><img src="" alt="LinkedIn logo" /></a>                    
                </section>
            </header>

            <StopWatch />
            <footer>
                <p className='footer__text'>Kelly Kou's submission for Front-End Software Engineering Internship at Shopify, Summer 2024
                </p>
            </footer>
        </main>
    )
}