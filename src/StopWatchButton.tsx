import React from 'react'

export default function StopWatchButton() {
    return(
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ margin: '0 10px', padding: '10px 20px', backgroundColor: 'green', color: '#FBF8EF'}}>START</button>
            <button style={{ margin: '0 10px', padding: '10px 20px', backgroundColor: 'orange', color: '#FBF8EF'}}>STOP</button>
            <button style={{ margin: '0 10px', padding: '10px 20px', backgroundColor: 'red', color: '#FBF8EF'}}>RESET</button>
            <button style={{ margin: '0 10px', padding: '10px 20px', backgroundColor: 'blue', color: '#FBF8EF'}}>LAP</button>
        </div>
    )
}