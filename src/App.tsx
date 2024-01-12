import React, { useState } from 'react';
import StopWatch from './StopWatch'

const styles: { [key: string]: React.CSSProperties } = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
        fontWeight: 200
    }
};

export default function App() {
    return(
        <div style={styles.container}>
            <h1 style={styles.title}>Welcome to Maggie's StopWatch!</h1>
            <StopWatch />
        </div>
    )
}