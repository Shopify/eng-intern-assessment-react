import React from 'react';
import timeGenerator from './timeGenerator';

export default function StopWatch(props: { time: number }) {
    return (
        <div>
            <p>{ timeGenerator(props.time) }</p>
        </div>
    );
}