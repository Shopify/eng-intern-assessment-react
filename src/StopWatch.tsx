import React, { useState, useEffect } from 'react'

export default function StopWatch() {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(seconds => seconds + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ fontSize: '60px', fontWeight: 'bold' }}>
                {new Date(seconds * 1000).toISOString().substring(11, 19)}
            </div>
        </div>
    );
}