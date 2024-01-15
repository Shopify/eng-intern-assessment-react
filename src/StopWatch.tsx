import React from 'react';
import {formatTime} from './lib/utils';

type Props = {
    time: number;
};

export default function StopWatch({ time }: Props) {
    return (
        <div>
            <h1 id='current-time'>{formatTime(time)}</h1>
        </div>
    );
}
