import React from 'react'

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