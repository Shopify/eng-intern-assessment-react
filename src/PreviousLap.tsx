import React, { useEffect, useState } from 'react'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Typography, ButtonGroup, Button } from '@mui/material';

type Lap = {
    number: number;
    time: number;
}

export default function PreviousLap(props: {number: number, time: number}) {

    const minutes = Math.floor((props.time % 360000) / 6000);
    const seconds = Math.floor((props.time % 6000) / 100);
    const miliseconds = props.time % 100;

    return (
        <div>
            <Typography variant="h5" gutterBottom>{props.number} - {minutes} : {seconds} : {miliseconds}</Typography>
        </div>
    )
}