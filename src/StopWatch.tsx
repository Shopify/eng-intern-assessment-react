import React, { ReactNode } from 'react'

export default function StopWatch(props: { time: {m: number; s: number; ms: number; h: number | React.ReactChild | React.ReactFragment | React.ReactPortal 
} }) {
    return(
        <div>
            <span>{typeof props.time.h === 'number' ? (props.time.h >= 10 ? props.time.h 
                : "0" + props.time.h) 
                : props.time.h}</span>&nbsp;:&nbsp;
            <span>{typeof props.time.m === 'number' ? (props.time.m >= 10 ? props.time.m 
                : "0" + props.time.m) 
                : props.time.m}</span>&nbsp;:&nbsp;
            <span>{typeof props.time.s === 'number' ? (props.time.s >= 10 ? props.time.s 
                : "0" + props.time.s) 
                : props.time.s}</span>&nbsp;:&nbsp;
            <span>{typeof props.time.ms === 'number' ? (props.time.ms >= 10 ? props.time.ms 
                : "0" + props.time.ms) 
                : props.time.ms}</span>&nbsp;&nbsp;
        </div>
    )
}