import React from 'react';
import {getTimeDisplayValue} from './util';

interface Props {
    timeInMs: number;
};

export default function Timer({timeInMs} : Props) {
    return (
        <div>
            { getTimeDisplayValue(timeInMs) }
        </div>
    )
}