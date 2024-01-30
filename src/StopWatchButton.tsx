import React from 'react'

export default function StopWatchButton(props: {
    lap: React.MouseEventHandler<HTMLButtonElement>;
    resume: React.MouseEventHandler<HTMLButtonElement>;
    reset:React.MouseEventHandler<HTMLButtonElement>;
    stop: React.MouseEventHandler<HTMLButtonElement>;
    status: number; start: React.MouseEventHandler<HTMLButtonElement> 
}) {
    return(
        <div>
            {(props.status === 0)?
                <button className="stopwatch-btn stopwatch-btn-green"
                    onClick={props.start}>Start</button> : ""
            }

            {(props.status === 1)?
                <div>
                <button className="stopwatch-btn stopwatch-btn-red"
                    onClick={props.stop}>Stop</button>
                <button className="stopwatch-btn stopwatch-btn-yellow"
                    onClick={props.reset}>Reset</button>
                <button className="stopwatch-btn stopwatch-btn-green"
                    onClick={props.lap}>Lap</button>
                </div> : ""
            }
            {(props.status === 2)?
                <div>
                <button className="stopwatch-btn stopwatch-btn-yellow"
                    onClick={props.resume}>Resume</button>
                <button className="stopwatch-btn stopwatch-btn-red"
                    onClick={props.reset}>Reset</button>
                </div> : ""
            }      
        </div>
    )
}