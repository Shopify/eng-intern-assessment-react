import React from 'react';
import timeGenerator from './timeGenerator';

export default function StopWatch(props: { time: number }) {
    return (
        <div>
            <p className="timer-text">{ timeGenerator(props.time) }</p>
        </div>
    );
}