import React from 'react'

export default function StopWatchButton(props: any) {
    const setStarted = props.setStarted;
    const setLaps = props.setLaps;
    const setTime = props.setTime;
    const laps = props.laps;

    const styles = {flex: '1', height: '100%', background: '#5AB3E5', borderRadius: 25, color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '800'};

    return (
        <div style={{width: '100%', height: '100%', background: 'black', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 12.50, border: '1px black solid', display: 'flex'}} >
            <button style={styles} onClick={() => setStarted(true)}>Start</button>
            <button style={styles} className='StopWatchButton' onClick={() => { setLaps([0]); setTime(0); }}>Reset</button>
            <button style={styles} className='StopWatchButton' onClick={() => setLaps([...laps, 0])}>Lap</button>
            <button style={styles} className='StopWatchButton' onClick={() => setStarted(false)}>Stop</button>
        </div>
    )
}