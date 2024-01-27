import React from 'react';
import timeGenerator from './timeGenerator';

export default function LapComponent(props: { lapNumber: number, absTime: number, lapTime: number }) {
    return(
        <div>
            <div className="lap-grid">
                <p>{ (props.lapNumber + 1) + "." }</p>
                <p>{ timeGenerator(props.absTime) }</p>
                <p>{ timeGenerator(props.lapTime) }</p>
            </div>
            <hr></hr>
        </div>
    )
}