import React from 'react'
import './styles.css'

export default function StopWatchButton() {
    
    return (
        <div className="container">
            <div className="watch">
                <div className="button-wrapper">
                    <button className="button reset">Reset</button>
                    <button className="button play">Play</button>
                    <button className="button lap">Lap</button>
                </div>
            </div>
            <ul className="laps">
                <button className="lap-clear-button">Clear All</button>
            </ul>
        </div>
    )
}