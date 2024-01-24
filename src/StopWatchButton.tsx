import React from 'react';
import './Button.css';
type props = {
    setTimeInSeconds: Function
};

export default function StopWatchButton(props:any) {
    return(
        <section className='ButtonContainer'>
            <button>Start</button>
            <button>Stop</button>
            <button>Reset</button>
            <button>Lap</button>
        </section>
    )
}
