import React from 'react';
import { Time } from './useTimer';

const formatNum = (n: number) => String(n).padStart(2, '0')

function TimeDisplay(props: { time: Time }) {
    let h: React.ReactNode = '';
    if (props.time.h !== 0) {
        h = <span>{formatNum(props.time.h % 100)}</span>
    }

    return (
        <div>
            {h}{'  '}
            <span>{formatNum(props.time.m)}</span>{' : '}
            <span>{formatNum(props.time.s)}</span>{' : '}
            <span>{formatNum(props.time.ms)}</span>{' '}
        </div>
    );
}

export default TimeDisplay;