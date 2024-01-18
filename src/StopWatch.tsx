import React from 'react'

/**
 * Display of StopWatch timing unit.
 * @param props tenMilliseconds(number of 10ms), seconds(number of seconds), minutes(number of minutes)
 * @returns A timimg display in the format aa:bb.cc where aa denotes minutes, bb denotes seconds and cc denotes number of 10ms
 */

export default function StopWatch(props: any) {
    const tenMilliseconds = props.tenMilliseconds;
    const seconds = props.seconds;
    const minutes = props.minutes;

    return (
        <div style={{width: '100%', height: '100%', color: '#F5F5F5', textAlign: 'center', fontSize: 36, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>
            <p>{ minutes }:{ seconds }.{ tenMilliseconds }</p> 
        </div>
    );
}