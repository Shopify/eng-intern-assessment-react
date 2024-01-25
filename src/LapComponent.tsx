import React from 'react';
import timeGenerator from './timeGenerator';

export default function LabComponent(props: { lapNumber: number, absTime: number, lapTime: number }) {
    return(
        <div>
            <p>#{ props.lapNumber + 1 } - { timeGenerator(props.absTime) } - { timeGenerator(props.lapTime) }</p>
        </div>
    )
}