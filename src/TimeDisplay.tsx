import React from 'react';
import { Time } from './useTimer';
import { padNum } from './utils';

// TimeDisplay displays a time in hours, minutes, seconds, miliseconds 
function TimeDisplay(props: { time: Time }) {
    // Display hours only if it is non-zero
    let h: React.ReactNode = '';
    if (props.time.h !== 0) {
        h = <span>{padNum(props.time.h % 100)}</span>
    }

    return (
        <div>
            {h}{'  '}
            <span>{padNum(props.time.m)}</span>{' : '}
            <span>{padNum(props.time.s)}</span>{' : '}
            <span>{padNum(props.time.ms / 10)}</span>{' '}
        </div>
    );
}

export default TimeDisplay;