import React from 'react';
import StopWatch from './StopWatch';

export default function App() {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            flexDirection: 'column'
        }}>
            <StopWatch />
        </div>
    );
}
