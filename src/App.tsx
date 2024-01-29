import React from 'react'
import StopWatch from './components/StopWatch/StopWatch'
import './App.css'

// render app interface, with simple header, stopwatch component, and simple footer

export default function App() {
    return (
        <>
            <header>
                <h1 className='title'>stopwatch</h1>
                <section className="icon__container">
                    <a href="https://github.com/heckyeakelly/eng-intern-assessment-react/tree/develop"> 💻 </a>
                    <a href="https://www.linkedin.com/in/kelly-kou/"> 💼 </a>
                </section>
            </header>

            <main><StopWatch /></main>

            <footer>
                <p className='footer__text'>Kelly Kou : technical challenge submission : Front-End Software Engineering Internship at Shopify, Summer 2024
                </p>
            </footer>
        </>
    )
}