import React from 'react'

interface StopWatchProps {
    seconds: number;
}

export default function StopWatch({ seconds }: StopWatchProps) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ fontSize: '60px', fontWeight: 'bold' }}>
                {new Date(seconds * 1000).toISOString().substring(11, 19)}
            </div>
        </div>
    );
}